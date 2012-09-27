OpenLearning Targets
====================

<br>

### view
The URL target <i>view</i> is used to embed an interactive app into an OpenLearning page or activity.

### configure
<i>configure</i> is accessed to embed an app's configuration panel in OpenLearning.

### automark
<i>automark</i> is a worker script target, called to automatically mark OpenLearning activities.

<br>


OpenLearning App API
====================

<br>
The following all take an optional callback as the last argument. If the callback is provided, it will become an asynchronous call with the result passed to the callback function.

<hr>

OpenLearning Data
-----------------------

<br>
### test( )
 
Code Example:

    response.writeText( OpenLearning.test( ) );

writes the version number of the API being used

<br>
### getUser( profileName )

JSON data object for the given user profile name

e.g.

    {
        fullName: 'Harry Potter',
        profileName: 'harry.potter',
        standardAvatar: 'http://.../harry.png'
    }

Code Example:

    response.writeJSON( OpenLearning.getUser( request.user ) );

<br>
<hr>

OpenLearning Pages
-------------------------
For apps which are used on OpenLearning pages, the following API can be used:

OpenLearning.page.methodName
<br>

### getPermissions( profileName )

returns a list of permissions that the user of the given profile has on a page. 

e.g. 

    ["read", "write", "admin"]

Code Example:

    if ( OpenLearning.page.getPermissions( request.user ).indexOf( "admin" ) != -1 ) {
       response.writeText( "You are an admin" );
    }

### getData( profileName )

returns data stored by apps on this page

Code Example:

    var allData = OpenLearning.page.getData( null );
    var dataProtectedByUser = OpenLearning.page.getData( request.user );

### setData( profileName, dataObject )

returns whether data is stored on this page successfully

e.g.

    {
        success: true,
    }

Code Example:

    OpenLearning.page.setData( null, { myData: 'hello' } );
    OpenLearning.page.setData( request.user, { myData: 'only store this if user is allowed' } );

<hr>

OpenLearning Activities
---------------------

<br>

For apps which are used as OpenLearning activities, the following API can be used:

OpenLearning.activity.methodName

<br>
### isActivity( )

Returns <i>true</i> if (and only if) this app is deployed as an OpenLearning activity.

<br>
### setMarks( userMarksJSON )

Takes a key-value store of profile name to data object, and stores this marking data for each of the given users.

Code Example:

    OpenLearning.activity.setMarks( {
       "hermoine.granger": {
          completed: true,
          score: 100
       },
       "ron.weasley": {
          completed: false,
          score: 42
       }
    } );
<br>
### getMarks( users )

Return an object with keys as each user, and value of a marks object.

Returns the best mark for each user.

<br>
### getLatestMark( user )

Returns the latest mark for a user.

<br>

### setSubmissionType( pageType, templateMarkup )

<i>templateMarkup</i> is optional.

Set the default page type for new submissions. <i>pageType<i> is one of:
   'content'
   'file'
   'multi-file'

<br>
### setTotalMarks( totalMarks )

Sets the total number of marks (score/grade) for this activity

e.g.

    OpenLearning.activity.setTotalMarks( 100 );

<br>
### setEmbedded( isEmbedded )

A shortcut to set the 'isEmbedded' attribute on an activity page. If this is set to true, the app will display the <i>view</i> target embedded within the activity page.

### setFullWidth( isFullWidth )

A shortcut to set the 'isFullWidth' attribute on an activity page. If this is set to true, the app will take up the full page width.

<br>

### submit( user )

Submit the user's submission for marking.

### getStatus( user )

Returns 'incomplete', 'pending' or 'completed' according to whether the given user's submission is not yet submitted (or marked incorrect), submitted but not yet marked, or has been marked correct (respectively).

### getSubmission( user )

Returns a user's submission to this activity. This will be the files, metadata or page content of the submission.

### saveSubmission( user, submissionObject, pageType )

Saves a user's submission to this activity. The format of the submission object depends on the page type specified when the submission is first saved.

<i>pageType</i> is optional, and is used to override the default page type set by the activity.

    'content' page type:
    {
      'content': { object which contains the document's layout },
      'markup': 'The Creole markup for this page',
      'metadata': { object storing extra data for the app, not displayed on a page }
    }

    'file' page type:
    {
      'filename': 'file.txt',
      'data': 'hello world',
      'markup': 'The Creole markup for a caption'
    }

    'multi-file' page type:

    [
      {
        'filename': 'file1.txt',
        'data': 'hello world'
      },

      {
        'filename': 'file2.txt',
        'data': 'dlrow olleh'
      }
    ]
