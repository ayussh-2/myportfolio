$(document).ready(function () {
    var moveToTopButton = $("#moveToTop");

    // Show/hide the button based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            moveToTopButton.css("opacity", "1").css("pointer-events", "auto");
        } else {
            moveToTopButton.css("opacity", "0").css("pointer-events", "none");
        }
    });
    // Scroll to the top when the button is clicked
    $("#arrowToTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

    $("#navlinksMobile a").click(() => {
        $("#mobileMenu").toggleClass("hidden show");
        $("#burgerIcon").toggleClass("fa-bars fa-xmark");
    });

    $("a[href^='#']").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });

    $('button[name="contactRefer"]').on("click", () => {
        $("html, body").animate(
            {
                scrollTop: $("#contact").offset().top,
            },
            1000
        );
    });

    runTestimonial(0);
});

$("#hamburger").click(() => {
    $("#mobileMenu").toggleClass("hidden show");
    $("#burgerIcon").toggleClass("fa-bars fa-xmark");
});

var navbar = $("#menus");
var sticky = navbar.offset().top;
$(window).scroll(() => {
    if (window.pageYOffset >= sticky) {
        navbar.addClass("sticky");
    } else {
        navbar.removeClass("sticky");
    }
});

function submitForm() {
    var name = $("#naam").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var purpose = $("#purpose").val();
    var details = $("#details").val();
    var notice = "";
    var arr = [name, email, phone, purpose, details];
    console.log(arr);
    var arr2 = ["Name ,", "Email ,", "Phone ,", "Purpose ,", "Details"];
    if (
        arr[0] == "" ||
        arr[1] == "" ||
        arr[2] == "" ||
        arr[3] == null ||
        arr[4] == ""
    ) {
        var i = 0;
        while (i < arr.length) {
            if (arr[i] == "" || arr[i] == null) {
                notice += arr2[i];
            }
            i++;
        }
        Toastify({
            text: notice + " fields cannot be left empty ",
            className: "info",
            style: {
                background:
                    "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                fontFamily: "Antic",
            },
        }).showToast();
    } else if (phone.length < 10) {
        Toastify({
            text: "Enter valid Phone no ",
            className: "info",
            style: {
                background:
                    "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                fontFamily: "Antic",
            },
        }).showToast();
    } else {
        // console.log(name, email, phone, purpose, details);
        $.ajax({
            url: "./api/submitter.php",
            method: "POST",
            data: {
                submitForm: true,
                name: name,
                email: email,
                phone: phone,
                purpose: purpose,
                details: details,
            },
            dataType: "json",
            success: function (response) {
                console.log("Server Response:", response);
                //   console.log(response.status);
                if (response.status === "success") {
                    $("#name").val("");
                    $("#email").val("");
                    $("#phone").val("");
                    $("#purpose").val("");
                    $("#details").val("");
                    Toastify({
                        text: "Request sent successfully!",
                        className: "info",
                        style: {
                            background:
                                "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                            fontFamily: "Antic",
                        },
                    }).showToast();
                } else {
                    Toastify({
                        text: "Error!",
                        className: "info",
                        style: {
                            background:
                                "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                            fontFamily: "Antic",
                        },
                    }).showToast();
                }
            },
            error: function (xhr, status, error) {
                // console.error("Error:", xhr.responseText);
                Toastify({
                    text: "Error connecting server!",
                    className: "info",
                    style: {
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                        fontFamily: "Antic",
                    },
                }).showToast();
            },
        });
    }
}

function runTestimonial(user) {
    var id = "#test" + user;
    var names = [
        "JOHN DOE",
        "OLIVIA THOMPSON",
        "ETHAN CARTER",
        "ISABELLA MARTINEZ",
    ];
    var text = [
        "Exceptional service! The team went above and beyond, delivering outstanding results. Truly grateful for their expertise and dedication.",
        "Outstanding experience from start to finish. Professionalism and quality are unmatched. Highly satisfied and definitely a customer for life!",
        "Impressed with the seamless process and attention to detail. Exceeded my expectations. Will definitely recommend to friends and family!",
        "A game-changer! The product not only met but surpassed my needs. Fantastic customer service and a pleasure to work with. Thank you!",
    ];
    $("[id^='test']").removeClass("activeUser");
    $("#name").empty();
    $("#testimonialContent").empty();
    $(id).addClass("activeUser");
    $("#name").append(names[user]);
    $("#testimonialContent").append(text[user]);
}

function downloadResume() {
    var pdfFilePath = "./misc/hello.pdf";

    var downloadLink = $("<a></a>");
    downloadLink.attr("href", pdfFilePath);
    downloadLink.attr("download", "downloaded_file.pdf");
    $("body").append(downloadLink);
    downloadLink[0].click();
    downloadLink.remove();
}

function switchDarkMode() {
    $("html").toggleClass("dark light");
    $("#iconSwitcher").toggleClass("fa-moon");

    $("#iconSwitcher2").toggleClass("fa-moon");

    if ($("html").hasClass("dark")) {
        $("#imgs img").each(function () {
            var currentSrc = $(this).attr("src");
            var darkSrc = currentSrc.replace(
                "./img/logos/",
                "./img/logos/dark/"
            );
            $(this).attr("src", darkSrc);
        });
    } else {
        $("#imgs img").each(function () {
            var currentSrc = $(this).attr("src");
            var lightSrc = currentSrc.replace(
                "./img/logos/dark/",
                "./img/logos/"
            );
            $(this).attr("src", lightSrc);
        });
    }
}

function passwordState() {
    $("#eye").toggleClass("fa-eye fa-eye-slash");
    $("#password").attr(
        "type",
        $("#password").attr("type") == "password" ? "text" : "password"
    );
}

function login(event) {
    event.preventDefault();
    var email = $("#email").val();
    var pass = $("#password").val();
    $.ajax({
        url: "./api/submitter.php",
        method: "POST",
        data: {
            login: true,
            email: email,
            password: pass,
        },
        dataType: "json",
        success: function (response) {
            console.log("Server Response:", response);
            //   console.log(response.status);
            if (response.status === "success") {
                $("#password").val("");
                $("#email").val("");
                window.location.href = "./dashboard.php";
            } else {
                Toastify({
                    text: "Error! Invalid Credentials",
                    className: "info",
                    style: {
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                        fontFamily: "Antic",
                    },
                }).showToast();
            }
        },
        error: function (xhr, status, error) {
            // console.error("Error:", xhr.responseText);
            Toastify({
                text: "Error connecting server!",
                className: "info",
                style: {
                    background:
                        "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                    fontFamily: "Antic",
                },
            }).showToast();
        },
    });
}

function getData() {
    $.ajax({
        url: "./api/submitter.php",
        method: "POST",
        data: {
            getData: true,
        },
        dataType: "json",
        success: function (response) {
            // console.log("Server Response:", response);
            if (response.status == "noData") {
                alert("No Entries till now!");
            } else {
                const dataToInput = response.map((jsonString) => {
                    try {
                        return JSON.parse(jsonString);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        return null; // or handle the error in a way that makes sense for your application
                    }
                });

                addData(dataToInput);
            }
        },
        error: function (xhr, status, error) {
            // console.error("Error:", xhr.responseText);
            Toastify({
                text: "Error connecting server!",
                className: "info",
                style: {
                    background:
                        "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                    fontFamily: "Antic",
                },
            }).showToast();
        },
    });
}

function addData(dataToInput) {
    const tbody = $("#tBody"); // Cache the tbody element
    for (let i = 0; i < dataToInput.length; i++) {
        const rowData = dataToInput[i];
        const row = $("<tr>").addClass(
            "border-b border-gray-200 dark:border-gray-700"
        );

        const buttonsCell = $("<td>"); // Move this line outside the loop

        for (const key in rowData) {
            const cell = $("<td>").addClass("px-6 py-4").text(rowData[key]);
            row.append(cell);

            if (key === "email") {
                const email = rowData[key];
                // console.log(email);

                // Insert email into button id
                const discussButton = $(
                    `<button class="m-5 p-2 bg-blue-400 text-white hover:opacity-70 rounded active:scale-75 duration-700" onClick="discussCumGreet('${email}')">Discuss/Greet</button>`
                );
                // discussButton.attr("id", `${email}`);
                buttonsCell.append(discussButton);

                const ignoreButton = $(
                    `<button class="m-5 p-2 bg-red-600 text-white hover:opacity-70 rounded active:scale-75 duration-700" onClick="ignore('${email}')">Ignore</button>`
                );
                // ignoreButton.attr("id", `${email}`);
                buttonsCell.append(ignoreButton);
            }
        }

        row.append(buttonsCell); // Append buttonsCell only once after the loop

        tbody.append(row);
    }
}

function ignore(email) {
    var result = confirm("Are you sure you want to ignore this entry?");
    if (result) {
        const mail = email;
        $.ajax({
            url: "./api/submitter.php",
            method: "POST",
            data: {
                ignoreRequest: true,
                email: mail,
            },
            dataType: "json",
            success: function (response) {
                // console.log("Server Response:", response);
                if (response.status == "success") {
                    // alert("No Entries till now!");\
                    alert("Succesfully ignored!");
                    location.reload();
                } else {
                    alert("Cannot ignore!");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", xhr.responseText);
                Toastify({
                    text: "Error connecting server!",
                    className: "info",
                    style: {
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(255,255,255,0.4375) 100%)",
                        fontFamily: "Antic",
                    },
                }).showToast();
            },
        });
    } else {
        alert("Operation Cancelled");
    }
}

function discussCumGreet(email) {
    var modal = document.getElementById("customModal");

    function showCustomModal() {
        modal.style.display = "block";
    }

    function closeCustomModal() {
        modal.style.display = "none";
    }

    showCustomModal();

    // Define actions for "discuss" and "Greet" buttons
    document
        .getElementById("discussButton")
        .addEventListener("click", function () {
            closeCustomModal();
            sendEmail(
                email,
                "It would be pleasure working with you!",
                "I am happy that you chose me! Here is my Phone: 9110133635 so that we can discuss the project if you are comfortable."
            );
        });

    document
        .getElementById("greetButton")
        .addEventListener("click", function () {
            closeCustomModal();
            sendEmail(
                email,
                "Greetings from my side I thank you for your suggestions!",
                "From your input recieved ...."
            );
        });
}

function sendEmail(email, subject, body) {
    var emailAddress = email;

    // Create a mailto link with Gmail-specific parameters
    var mailtoLink =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" +
        encodeURIComponent(emailAddress) +
        "&su=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

    // Open the default browser with the Gmail link
    window.open(mailtoLink, "_blank");
}

function logout() {
    $.ajax({
        type: "POST",
        url: "./api/logout.php",
        success: function (response) {
            window.location.href = "./index.php";
        },
    });
}
