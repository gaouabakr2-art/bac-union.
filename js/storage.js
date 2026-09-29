// Local Data Access Layer (Standalone static mode)
window.StorageAPI = {
  // Get preloaded files count for welcome stats
  getStudentFilesCount() {
    const preloads = window.PRELOADED_FILES || [];
    return preloads.length;
  },

  // Get static files filtered by section and subject
  getFiles(sectionId, subjectId) {
    const preloads = window.PRELOADED_FILES || [];
    
    return preloads.filter(file => 
      file.section === sectionId && 
      file.subject === subjectId
    );
  }
};
