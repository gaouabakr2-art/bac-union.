// Local Data Access Layer (Standalone static mode)
window.StorageAPI = {
  // Get preloaded files count for welcome stats
  async getStudentFilesCount() {
    const preloads = window.PRELOADED_FILES || [];
    return preloads.length;
  },

  // Get static files filtered by section and subject
  async getFiles(sectionId, subjectId) {
    const preloads = window.PRELOADED_FILES || [];
    
    return preloads.filter(file => 
      file.section === sectionId && 
      file.subject === subjectId
    );
  }
};
