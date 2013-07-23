/* Any JavaScript here will be loaded for users using the MonoBook skin */
(function(){
 
  // Ensure that Monobook is used
	if ( skin !== "monobook" ) {
		alert( "A heavenly voice informs you that Monohead needs to be placed into MediaWiki:Monobook.js" );
		return;
	} else if ( mw.config.get( "wgNamespaceNumber" ) !== 2 ) {
		// and verify the namespace
		return;
	}
 
 
	var username = document.getElementById( "firstHeading" ).textContent.split( ":" )[1],	
		xhr = new XMLHttpRequest();
 
	// Main function that works with the user data
	xhr.onload = function () {
		var udata = JSON.parse( this.responseText ).query.allusers[0],
			ec, edits, header, mast, separator;				
 
		// Create the editcount number
		ec = document.createElement( "em" );
		ec.id = "editcount";
		ec.textContent = udata.editcount;
 
		// Create separator
 
		separator = document.createElement( "span" );
		separator.id = "monohead-separator";
		separator.textContent = "|";
 
		// Create wrapper element
		edits = document.createElement( "p" );
		edits.appendChild( ec );
		edits.appendChild( document.createTextNode( " global edits" ) );
		edits.appendChild( separator )
 
		// Create mast for user name
		mast = document.createElement( "h1" );
		mast.id = "mast";
		mast.textContent = udata.name;
 
		// If the user is a member of any groups, add these to the mast.
		if ( typeof udata.groups !== "undefined" ) {
			var groups = udata.groups, i, tag;
			for ( i = 0; i < groups.length; i++ ) {
				tag = document.createElement("span");
				tag.className = "tag" + groups[i];
				tag.textContent = groups[i];
				edits.appendChild( tag );
			}
		}
 
		// Create the container for all this
		header = document.createElement( "header" );
		header.id = "Monohead";
		header.appendChild( mast );
		header.appendChild( edits );
 
		// Add the container to the correct place			
		document.getElementById( "content" ).insertBefore( header, document.getElementById( "top" ) );			
	}
 
	// Actually fetch the user data
	xhr.open( "GET", "/api.php?format=json&action=query&list=allusers&aufrom=" + encodeURIComponent( username ) + "&aulimit=1&auprop=editcount|groups" );
	xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded; charset=UTF-8" );
 
	xhr.send();
}());
