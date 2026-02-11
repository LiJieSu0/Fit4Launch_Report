import { safeFetchJson } from './DataLoader';

const BASE_DATA_PATH = '/AnalyzeResults/';

/**
 * Loads CDF data from a specific JSON file.
 * @param {string|object} project - Project name or project data object.
 * @param {string} city - City name.
 * @param {string} filename - The specific CDF JSON filename.
 * @returns {Promise<object|null>} The CDF data object or null if failed.
 */
export const loadCdfData = async (project, city, filename) => {
    const folderName = typeof project === 'object' ? project.dataFolderName : project;
    const projectPath = folderName ? `${encodeURIComponent(folderName)}/` : '';
    const url = `${BASE_DATA_PATH}${projectPath}${encodeURIComponent(city)}/cdf_throughput_data/${filename}`;

    return await safeFetchJson(url);
};
