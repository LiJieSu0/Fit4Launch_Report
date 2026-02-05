from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple


@dataclass(frozen=True)
class RuleResult:
    ok: bool
    summary: str
    messages: List[str]
    parsed: Dict[str, str]
    test_category: Optional[str]
    remote_city: Optional[str]


def _tokenize_filename(filename: str) -> List[str]:
    """
    Tokenize filename into alnum tokens for boundary matching.
    - case-insensitive
    - split on any non [a-z0-9]
    """
    toks = re.split(r"[^a-z0-9]+", filename.lower())
    return [t for t in toks if t]


def _tokenize_option(option: str) -> List[str]:
    return _tokenize_filename(option)


def _contains_token_phrase(tokens: List[str], phrase_tokens: List[str]) -> bool:
    """True if phrase_tokens appears as a consecutive subsequence in tokens."""
    if not phrase_tokens:
        return False
    n, m = len(tokens), len(phrase_tokens)
    if m > n:
        return False
    for i in range(0, n - m + 1):
        if tokens[i:i+m] == phrase_tokens:
            return True
    return False


def _find_one_token_phrase(
    filename_tokens: List[str],
    options: List[str],
    field_name: str,
) -> Tuple[Optional[str], List[str]]:
    hits: List[str] = []
    for opt in options:
        if _contains_token_phrase(filename_tokens, _tokenize_option(opt)):
            hits.append(opt)

    msgs: List[str] = []
    if len(hits) == 0:
        msgs.append(f"[ERROR] Missing {field_name}: none of {options} found.")
        return None, msgs
    if len(hits) > 1:
        msgs.append(f"[ERROR] Multiple {field_name} values found: {hits}. Keep only one.")
        return None, msgs
    return hits[0], msgs

def ci_contains(haystack: str, needle: str) -> bool:
    return needle.casefold() in haystack.casefold()

def ci_contains_any(haystack: str, needles: List[str]) -> bool:
    hs = haystack.casefold()
    return any(n.casefold() in hs for n in needles)

def derive_test_category(service_value: Optional[str]) -> Optional[str]:
    if not service_value:
        return None
    s = service_value.lower()

    # test category definition
    DP_KEYS = ["ul", "dl", "ping"]
    CP_KEYS = ["cp"]
    Coverage_KEYS = ["coverage"]
    VQ_KEYS = ["vq", "audio"]

    if ci_contains_any(s, DP_KEYS):
        return "DP"
    if ci_contains_any(s, CP_KEYS):
        return "CP"
    if ci_contains_any(s, Coverage_KEYS):
        return "Coverage"
    if ci_contains_any(s, VQ_KEYS):
        return "VQ"
    return None

def validate_filename(filename: str) -> RuleResult:
    """
    Token/boundary matching:
    - each field matches EXACT token phrase (consecutive tokens), and exactly one option.
    - VQ Mode (Option A): required when TestCategory == VQ
    """
    tokens = _tokenize_filename(filename)

    operator_opts = ["TMO", "ATT", "VZW"]
    network_opts = ["SA", "LTE", "VONR ON", "VONR OFF", "5G AUTO", "5G NSA"]
    service_opts = [
        "HTTP SS UL 15M",
        "HTTP MS UL 30S",
        "UDP UL 6M 10S",
        "UDP UL 12M 10S",
        "25x64 bytes PING",
        "HTTP SS DL 60S",
        "HTTP MS DL 30S",
        "UDP DL 30M 10S",
        "UDP DL 60M 10S",
        "UDP UL 10M 10S",
        "UDP UL 20M 10S",
        "UDP DL 200M 10S",
        "UDP DL 400M 10S",
        "VoNR Enabled CP MO",
        "VoNR Enabled CP MT",
        "VoNR Disabled CP MO",
        "VoNR Disabled CP MT",
        "5G n41 HPUE Coverage Test",
        "5G VoNR Coverage Test",
        "VoNR Enabled AMR NB VQ",
        "VoNR Enabled AMR WB VQ",
        "VoNR Enabled EVS WB VQ",
        "VoNR Disabled EVS WB VQ",
        "VoNR Enabled Audio Delay",
        "VoNR Disabled Audio Delay",
    ]
    city_opts = ["SEA", "NY"]
    location_opts = ["L1", "L2", "L3"]
    device_opts = ["DUT", "REF"]
    band_opts = ["N41", "N25", "N71"]
    vq_mode_opts = ["BASE", "MOBILE"]

    messages: List[str] = []
    parsed: Dict[str, str] = {}

    operator, msgs = _find_one_token_phrase(tokens, operator_opts, "Operator")
    messages += msgs
    if operator:
        parsed["Operator"] = operator

    network, msgs = _find_one_token_phrase(tokens, network_opts, "Network")
    messages += msgs
    if network:
        parsed["Network"] = network

    service, msgs = _find_one_token_phrase(tokens, service_opts, "Service")
    messages += msgs
    if service:
        parsed["Service"] = service

    city, msgs = _find_one_token_phrase(tokens, city_opts, "City")
    messages += msgs
    if city:
        parsed["City"] = city

    device, msgs = _find_one_token_phrase(tokens, device_opts, "DeviceType")
    messages += msgs
    if device:
        parsed["DeviceType"] = device

    test_category = derive_test_category(service)

    if test_category == "DP":
        location, msgs = _find_one_token_phrase(tokens, location_opts, "Location")
        msg_postfix = f' "{service}" belongs to {test_category} and "Location" info needed as one of {location_opts}' if service else ""
        messages.append(msgs[-1] + msg_postfix) if len(msgs) > 0 else None
        if location:
            parsed["Location"] = location

    if test_category == "Coverage":
        if service and service.lower() == "5g n41 hpue coverage test".lower():
            pass
        else:
            band, msgs = _find_one_token_phrase(tokens, band_opts, "Band")
            msg_postfix = f' "{service}" belongs to {test_category} and "Band" info needed as one of {band_opts}' if service else ""
            messages.append(msgs[-1] + msg_postfix) if len(msgs) > 0 else None
            if band:
                parsed["Band"] = band

    if test_category == "VQ":
        vq_mode, msgs = _find_one_token_phrase(tokens, vq_mode_opts, "VQ Mode")
        msg_postfix = f' "{service}" belongs to {test_category} and "VQ Mode" info needed as one of {vq_mode_opts}' if service else ""
        messages.append(msgs[-1] + msg_postfix) if len(msgs) > 0 else None
        if vq_mode:
            parsed["VQ Mode"] = vq_mode

    ok = all(not m.startswith("[ERROR]") for m in messages)
    summary = "OK" if ok else f"ERRORS: {sum(1 for m in messages if m.startswith('[ERROR]'))}"

    return RuleResult(
        ok=ok,
        summary=summary,
        messages=messages,
        parsed=parsed,
        test_category=test_category,
        remote_city=city,
    )
