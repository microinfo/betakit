
var AdminHomeView = Backbone.View.extend({

  el: 'body',

  initialize: function(options)
  {
    this.render();
  },

  events: {
    "click .inviteBtn": "invite",
    "click #importShowBtn": "showImportSection",
    "click #hideImportBtn": "hideImportSection",
    "click #importBtn": "importEmails",
    "click #exportBtn": "exportEmails",
  },

  render: function() {
  },

  exportEmails: function() 
  {
    window.open("/api/export_emails");
  },

  importEmails: function()
  {
    emails = $('#importText').val();
    $('#importStatus').html("importing...");

    $.post("/api/import_emails",
        {emails: emails},
        function(data, textStatus, xhr)
        {
          $('#importStatus').html(data);
        },
        "text");
  },

  showImportSection: function()
  {
    $('#importSection').slideDown();
  },

  hideImportSection: function()
  {
    $('#importSection').slideUp();
  },

  invite: function(event) {
    var email = $(event.target).attr("email");
    $('[inviteSection="' + email + '"]').html("sending email...");

    $.ajax({
      url: "/api/invite_user?email=" + encodeURIComponent(email),
      success: function(data, textStatus, xhr)
        {
          $('[inviteSection="' + email + '"]').html("Invite Sent");
        },
      error: function(xhr, tStatus, error)
        {
          $('[inviteSection="' + email + '"]').html("hmmmm, there may have been a problem...");
        },
    });
  } 

});

$(window).load(function(){
  // start backbone
  new AdminHomeView(); 
});

