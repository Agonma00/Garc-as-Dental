$(function () {
  "use strict";
  //****************************
  /* Left header Theme Change function Start */
  //****************************
  function handlelogobg() {
    $(".theme-color .theme-item .theme-link").on("click", function () {
      var logobgskin = $(this).attr("data-logobg");
      $(".topbar .top-navbar .navbar-header").attr("data-logobg", logobgskin);
    });
  }
  handlelogobg();
  //****************************
  /* Top navbar Theme Change function Start */
  //****************************
  function handlenavbarbg() {
    if ($("#main-wrapper").attr("data-navbarbg") == "skin6") {
      // do this
      $(".topbar .navbar").addClass("navbar-light");
      $(".topbar .navbar").removeClass("navbar-dark");
    } else {
      // do that
      $(".topbar .navbar").removeClass("navbar-light");
      $(".topbar .navbar").addClass("navbar-dark");
    }
    $(".theme-color .theme-item .theme-link").on("click", function () {
      var navbarbgskin = $(this).attr("data-navbarbg");
      $("#main-wrapper").attr("data-navbarbg", navbarbgskin);
      $(".topbar .navbar-collapse").attr("data-navbarbg", navbarbgskin);
      if ($("#main-wrapper").attr("data-navbarbg") == "skin6") {
        // do this
        $(".topbar .navbar").addClass("navbar-light");
        $(".topbar .navbar").removeClass("navbar-dark");
      } else {
        // do that
        $(".topbar .navbar").removeClass("navbar-light");
        $(".topbar .navbar").addClass("navbar-dark");
      }
    });
  }

  handlenavbarbg();

  //****************************
  // ManageSidebar Type
  //****************************
  function handlesidebartype() {}
  handlesidebartype();

  //****************************
  /* Manage sidebar bg color */
  //****************************
  function handlesidebarbg() {
    $(".theme-color .theme-item .theme-link").on("click", function () {
      var sidebarbgskin = $(this).attr("data-sidebarbg");
      $(".left-sidebar").attr("data-sidebarbg", sidebarbgskin);
    });
  }
  handlesidebarbg();
  //****************************
  /* sidebar position */
  //****************************
  function handlesidebarposition() {
    $("#sidebar-position").change(function () {
      if ($(this).is(":checked")) {
        $("#main-wrapper").attr("data-sidebar-position", "fixed");
        $(".topbar .top-navbar .navbar-header").attr("data-navheader", "fixed");
      } else {
        $("#main-wrapper").attr("data-sidebar-position", "absolute");
        $(".topbar .top-navbar .navbar-header").attr(
          "data-navheader",
          "relative"
        );
      }
    });
  }
  handlesidebarposition();
  //****************************
  /* Header position */
  //****************************
  function handleheaderposition() {
    $("#header-position").change(function () {
      if ($(this).is(":checked")) {
        $("#main-wrapper").attr("data-header-position", "fixed");
      } else {
        $("#main-wrapper").attr("data-header-position", "relative");
      }
    });
  }
  handleheaderposition();
  //****************************
  /* sidebar position */
  //****************************
  function handleboxedlayout() {
    $("#boxed-layout").change(function () {
      if ($(this).is(":checked")) {
        $("#main-wrapper").attr("data-boxed-layout", "boxed");
      } else {
        $("#main-wrapper").attr("data-boxed-layout", "full");
      }
    });
  }
  handleboxedlayout();
  //****************************
  /* Header position */
  //****************************
  function handlethemeview() {
    $("#theme-view").change(function () {
      if ($(this).is(":checked")) {
        $("body").attr("data-theme", "dark");

        var bgskin = "skin5";
        $(".left-sidebar").attr("data-sidebarbg", bgskin);
        $(".topbar .top-navbar .navbar-header").attr("data-logobg", bgskin);
        $("#main-wrapper").attr("data-navbarbg", bgskin);
        $(".topbar .navbar-collapse").attr("data-navbarbg", bgskin);
        if ($("#main-wrapper").attr("data-navbarbg") == "skin6") {
          // do this
          $(".topbar .navbar").addClass("navbar-light");
          $(".topbar .navbar").removeClass("navbar-dark");
        } else {
          // do that
          $(".topbar .navbar").removeClass("navbar-light");
          $(".topbar .navbar").addClass("navbar-dark");
        }
      } else {
        $("body").attr("data-theme", "light");

        var bgskin = "skin6";
        $(".left-sidebar").attr("data-sidebarbg", bgskin);
        $(".topbar .top-navbar .navbar-header").attr("data-logobg", bgskin);
        $("#main-wrapper").attr("data-navbarbg", bgskin);
        $(".topbar .navbar-collapse").attr("data-navbarbg", bgskin);
        if ($("#main-wrapper").attr("data-navbarbg") == "skin6") {
          // do this
          $(".topbar .navbar").addClass("navbar-light");
          $(".topbar .navbar").removeClass("navbar-dark");
        } else {
          // do that
          $(".topbar .navbar").removeClass("navbar-light");
          $(".topbar .navbar").addClass("navbar-dark");
        }
      }

      updateData(email);
    });
  }
  handlethemeview();

  function updateData(email) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://teams.connect24.io/core/functions/settings/style-setting.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email=" + email);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
      }
    };
  }
});
