export type GenerateReadmeParams = {
  projectName: string;
  packageManager: string;
  needsTypeScript: boolean;
};

export const generateReadme = (params: GenerateReadmeParams): string => {
  let readme: string = `# ${params.projectName}
    
    The information contained herein is automatically generated and explains how you can better use the Istanbul Framework based on your choices.

    When the packages are complete, the actual explanations will be here.
    `;

  return readme;
};
