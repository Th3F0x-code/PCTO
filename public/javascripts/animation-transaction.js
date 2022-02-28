var x = $(window).width() - 400;

$('.donate form').on("click", function () {
    amount = $('input[name=amount]:checked', '#donAmount').val();
    $('#confirm .amount').text("ETH" + amount);
    $('#check span').text("ETH" + amount);
});

$(".donate button").on("click", function () {
    $(".donate").toggleClass("active");
    if ($(".donate").is(".active")) $("form").slideDown(450, "easeOutQuart");

    else $("form").slideUp(300, "easeInOutQuad");
});

$('.donate label').on("click", function () {
    setTimeout(function () {
        if (amount == "other") {
            $("#custom").css("margin-left", x / 2);
            $("#custom").css("margin-right", x / 2);
            $('body').addClass('custom');
            $(".donate").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function () {
                $("#custom").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
            });
        }
        else {
            $('body').removeClass('custom');
            $(".donate").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function () {
                $(".choose").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
            });
        }
    }, 150);
});

$('#custom .next').on("click", function () {

    amount = $('input[name=custom-amount]', '#customDonation').val();

    //checking if amount is a number (float or integer) or not
    //if it's not a number the user won't go further until the input is
    if (!isNaN(Number(amount)) && amount !== undefined && amount !== "") {
        $('#confirm .amount').text("ETH " + amount);
        $('#check span').text("ETH " + amount);
        $("#custom").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function () {
            $(".choose").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
        });
    }
});

$('#custom .back').on("click", function () {
    $("#custom").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function () {
        $(".donate").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
    });
});


$('.choose form').on("click", function () {
    chooseReason = $('input[name=choose-reason]:checked', '#chooseReason').val();
    $('#confirm .choose-reason').text("ETH " + amount);
    $('#check span').text("ETH " + amount);
});

$(".choose button").on("click", function () {
    $(".choose").toggleClass("active");
    if ($(".choose").is(".active")) $("form").slideDown(450, "easeOutQuart");

    else $("form").slideUp(300, "easeInOutQuad");
});

$('.choose label').on("click", function () {
    $(".choose ").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function () {
        $("#check").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
    });
});

$('#check .back').on("click", function () {
    $("#check").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function () {
        $(".choose").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
    });
});


$("#check .next").on('click', async function () {
    $("#check").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function () {
        $('.check').hide();
        $(".processing").fadeIn(1500, function () {
            $(".progress").animate({ width: "14em" }, 3500, "easeInOutCirc",);
        });
    });

    await waitUntil(() => finishAnimation == true);
    setTimeout(function () {

        $(".mask").hide("slide", { easing: "easeInQuart", direction: "right" }, 600, function () {
            $('.processing .message, .outer').hide();
            $('.check').show("slide", { easing: "easeOutQuart", direction: "left" }, 800, function(){
                $("#confirm").addClass('animated fadeInUp');
            });
        });

    }, 4000);

});