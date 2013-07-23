function addMastheadTags() {
  var rights = {};
 
  rights["Mckrongs"]        = ["Guildmaster","Bureaucrat"],
  rights["PurpleIsGood"]    = ["Guildmaster"],
  rights["Democide"]        = ["Guildmaster"],
 
  rights["Non-existent User"] = ["Do not remove this line"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "bureaucrat") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    } 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
