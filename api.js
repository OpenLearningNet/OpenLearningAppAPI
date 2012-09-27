var rpcResult = function( data ) {
  var result;

  if ( data == null ) {
    throw {
      name: 'Connection Exception',
      message: 'OpenLearning API is Unavailable'
    };
  } else if ( typeof(data) == 'object' ) {
    if ( data.error ) {
      throw {
        name: 'OpenLearning API Exception',
        message: data.error
      };
    } else if ( data.result ) {
      result = data.result;
    } else {
      result = data; 
    }
  } else {
    result = data;
  }

  if ( result.hasOwnProperty['success'] ) {
    if ( result.success ) {
      return result;
    } else {
      throw {
        name: 'OpenLearning Exception',
        message: result.reason
      };
    }
  } else {
    return result;
  }
};

var OpenLearning = {
  activity: {
    isActivity: function( callback ) {
      return rpcResult( jsonRPC( 'olv2.activities.isActivity'), [], callback );
    },

    getLatestMark: function( user, callback ) {
      var result = rpcResult( jsonRPC( 'olv2.activities.getLatestMark', [user], callback ) );
      if (result.mark) {
        return result.mark;
      } else {
        return result;
      }
    },

    getMarks: function( users, callback ) {
      var result = rpcResult( jsonRPC( 'olv2.activities.getMarks', [users], callback ) );
      if (result.marks) {
        return result.marks;
      } else {
        return result;
      }
    },
    
    setMarks: function( userMarks, callback ) {
      var result = rpcResult( jsonRPC( 'olv2.activities.setMarks', [userMarks], callback ) );
      if (result.successfulMarks) {
        return result.successfulMarks;
      } else {
        return result;
      }
    },
    
    setTotalMarks: function( totalMarks, callback ) {
      return rpcResult( jsonRPC( 'olv2.activities.setTotalMarks', [totalMarks], callback ) );
    },

    setEmbedded: function( isEmbedded, callback ) {
      return OpenLearning.page.setData( { 'isEmbedded': isEmbedded }, callback );
    },

    setFullWidth: function( isFullWidth, callback ) {
      return OpenLearning.page.setData( { 'isFullWidth': isFullWidth }, callback );
    },

    setAutomarked: function( isAutomarked, callback ) {
      return OpenLearning.page.setData( { 'isAutomarked': isAutomarked }, callback );
    },
    
    getSubmission: function( profileName, callback ) {
      return rpcResult( jsonRPC( 'olv2.activities.getSubmission', [profileName], callback ) );
    },
    
    saveSubmission: function( profileName, submissionData, pageType, callback ) {
      if ( (typeof pageType) == 'function' ) {
        callback = pageType;
      }

      return rpcResult( jsonRPC( 'olv2.activities.saveSubmission', [profileName, submissionData, pageType], callback ) );
    },

    getStatus: function( profileName, callback ) {
      var result = rpcResult( jsonRPC( 'olv2.activities.getStatus', [profileName], callback ) );

      if (typeof result.status !== 'undefined') {
        return result.status;
      } else {
        return result;
      }
    },

    setSubmissionType: function( pageType, template, callback ) {
      if (!template) {
        template = null;
      }
      return rpcResult( jsonRPC( 'olv2.activities.setSubmissionType', [pageType, template], callback ) );
    },

    submit: function( profileName, callback ) {
      return rpcResult( jsonRPC( 'olv2.activities.submit', [profileName], callback ) );
    }
  },
  
  page: {
    getData: function( profileName, callback ) {
      if (!profileName) {
        profileName = null;
      }

      var result = rpcResult( jsonRPC( 'olv2.page.getData', [profileName], callback ) );
      if (result.data) {
        return result.data;
      } else {
        return result;
      }
    },
    
    setData: function( appData, profileName, callback ) {
      if (!profileName) {
        profileName = null;
      }
      return rpcResult( jsonRPC( 'olv2.page.setData', [profileName, appData], callback ) );
    },
    
    getPermissions: function( profileName, callback ) {
      var result = rpcResult( jsonRPC( 'olv2.page.getPermissions', [profileName], callback ) );
      if (result.permissions) {
        return result.permissions;
      } else {
        return result;
      }
    }
  },
  
  getUserData: function( profileName, callback ) {
    var result = rpcResult( jsonRPC( 'olv2.user.get', [profileName], callback ) );
    if (result.userData) {
      return result.userData;
    } else {
      return result;
    }
  },
  
  test: function( callback ) {
    return rpcResult( jsonRPC( 'olv2.test.version', [], callback ) );
  }
};
