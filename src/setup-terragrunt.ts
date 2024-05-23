import * as core from '@actions/core'
import os from 'os';
import exec from '@actions/exec';
import tc from '@actions/tool-cache';

const mapArch = (arch: string) => {
    const mappings = {
        x32: '386',
        x64: 'amd64',
        arm: 'arm64',
        arm64: 'arm64'
    };
    return mappings[arch as keyof typeof mappings];
}

const mapOS = (os: string) => {
    const mappings = {
        darwin: 'darwin',
        win32: 'windows',
        linux: 'linux'
    };
    return mappings[os as keyof typeof mappings];
}

const downloadCLI = async (version: string, platform: string, arch: string) => {
    core.debug(`Downloading Terragrunt CLI for ${version}, ${platform}, ${arch}`);
    const fileSuffix = platform === 'windows' ? '.exe' : '';
    const url = `https://github.com/gruntwork-io/terragrunt/releases/download/${version}/terragrunt_${platform}_${arch}${fileSuffix}`
    core.debug(`Downloading Terragrunt CLI from ${url}`)

    const pathToCLI = await tc.downloadTool(url);

    core.debug(`Terragrunt CLI path is ${pathToCLI}.`);

    if (!pathToCLI) {
        throw new Error(`Unable to download Terragrunt from ${url}`);
    }

    core.debug(`Making Terragrunt binary executable`);
    await exec.exec("chmod", ["+x", pathToCLI]);

    return pathToCLI;
}


const isTerragruntCached = (version: string) => {
    const toolPath = tc.find('terragrunt', version);
    return toolPath != undefined && toolPath !== '';
}

export const setup = async (): Promise<void> => {
    try {
        const version = core.getInput('version');

        const osPlatform = os.platform();
        const osArch = os.arch();

        core.debug(`Finding releases for Terragrunt version ${version}`);
        const platform = mapOS(osPlatform);
        const arch = mapArch(osArch);

        let toolPath;
        if (!isTerragruntCached(version)) {
            const pathToCLI = await downloadCLI(version, platform, arch);
            toolPath = await tc.cacheFile(pathToCLI, 'terragrunt', 'Terragrunt', version);
        } else {
            toolPath = tc.find('terragrunt', version);
        }

        core.addPath(toolPath);
    } catch (error: any) {
        core.error(error);
        throw error;
    }
}