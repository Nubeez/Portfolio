const sections = document.querySelectorAll("section");
gsap.registerPlugin(ScrollTrigger);
sections.forEach((section) => {
    const imgs = section.querySelectorAll(".front_img");
    const imgCount = imgs.length; // 추가된 변수
    const content00 = section.querySelector(".content00");
    const content01 = section.querySelector(".content01");
    const text = section.querySelector(".front_title");

    window.onload = function () {
        hideLoading();
    };
    //   intro 로딩
    function hideLoading() {
        const loading = document.getElementById("loading");
        // 로딩창 요소 가져오기
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        // body 요소에 overflow: hidden 스타일을 추가하여 스크롤을 막습니다.

        // 로딩창 요소 애니메이션 효과 추가
        gsap.to(loading, {
            opacity: 0,
            delay: 3, //로딩 딜레이 3초
            duration: 0.5,
            onComplete: function () {
                // 애니메이션 완료 후 로딩창 요소 제거
                if (loading && loading.parentNode) {
                    loading.parentNode.removeChild(loading);
                }

                // 배경 애니메이션 시작
                const loadingWrap = document.getElementById("loading_wrap");
                if (loadingWrap) {
                    const loadingLeft = document.querySelector(".loading-left");
                    const loadingRight = document.querySelector(".loading-right");

                    loadingWrap.addEventListener("animationend", function () {
                        // 애니메이션 완료 후 로딩창 배경 요소 제거
                        if (loadingWrap.parentNode) {
                            loadingWrap.parentNode.removeChild(loadingWrap);
                        }
                    });

                    loadingLeft.addEventListener("animationend", function () {
                        // 왼쪽 배경 애니메이션이 끝난 후 오른쪽 배경 애니메이션 시작
                        loadingRight.style.animationDelay = "0s";
                    });
                }
                // 로딩창이 완전히 사라진 후 body 요소의 overflow 값을 원래대로.
                document.body.style.overflow = "visible"; // overflow 스타일 값 변경
            },
        });
    }

    // 모든 리소스가 로드된 후 로딩창 숨기는 코드
    window.addEventListener("load", hideLoading);

    // error 다른탭으로 이동 시 loading_wrap이 삭제가 안되는 부분이있다
    // 아래 코드는 그걸 대비하여 스크롤을 내리면 삭제되게 구현
    $(window).scroll(function () {
        const scroll = $(document).scrollTop();

        //스크롤이 150px 미만이면 #loading_wrap 요소를 삭제합니다.
        if (scroll < 50) {
            $("#loading_wrap").remove();
        }
    });

    //인트로 이후 메인 인삿말
    setInterval(function () {
        if (content00) {
            // content00가 존재할 경우에만 gsap.to() 실행
            gsap.to(content00, {
                y: 0,
                opacity: 0,
                duration: 2,
            });
        }

        if (content01) {
            // content01이 존재할 경우에만 gsap.to() 실행
            gsap.to(content01, {
                y: 0,
                opacity: 1,
                duration: 2,
            });
        }
    }, 4500 /* 인트로,로딩 끝나고 4.5초로 딜레이 맞춤 실행 */);

    // section08 하단 텍스트
    gsap.fromTo(
        text,
        {
            x: "-100%",
        },
        {
            x: "20%",
            duration: 2,
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        }
    );

    // 이미지 스크롤 트리거 시작
    imgs.forEach((img, index) => {
        // 각 이미지의 위치를 중앙으로 맞추기 위해 사용됩니다.
        const offset = ((index - (imgCount - 1) / 2) / imgCount) * window.innerWidth * 0.2;

        // Section03, Section05, Section07은 왼쪽으로 이동합니다.
        if (section.id === "section02") {
            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    imgs.forEach((img, index) => {
                        const offset = (3 / imgCount) * window.innerWidth * 0.6;
                        gsap.set(img, {
                            x: +self.progress * offset, // x 좌표값에 음수를 취해 이미지를 왼쪽으로 이동합니다.
                        });
                    });
                },
            });
        }
    });
});
// 스크롤이 section02에 도달하면 타이핑 애니메이션을 실행합니다.
const content02 = document.querySelector(".content02");
const typing = document.querySelector(".typing");

function playAnimation() {
    typing.classList.add("playing");
}

function pauseAnimation() {
    typing.classList.remove("playing");
}

function handleScroll() {
    // 콘텐츠의 크기와 위치를 가져옵니다.
    const contentRect = content02.getBoundingClientRect();
    // 콘텐츠가 화면 안에 보이는지 확인합니다.
    const isContentVisible = contentRect.top < window.innerHeight && contentRect.bottom > 0;

    // 콘텐츠가 화면 안에 보이면 애니메이션을 실행하고, 그렇지 않으면 애니메이션을 일시 정지합니다.
    if (isContentVisible) {
        playAnimation();
    } else {
        pauseAnimation();
    }
}
// 스크롤 이벤트가 발생할 때 handleScroll 함수를 호출합니다.
window.addEventListener("scroll", handleScroll);

// 메뉴를 클릭하면 해당 section으로 이동합니다.
function scrollToSection1() {
    const section02 = document.getElementById("section02");
    window.scrollTo({
        top: section02.offsetTop,
        behavior: "smooth",
    });
}
function scrollToSection2() {
    const section03 = document.getElementById("section03");
    window.scrollTo({
        top: section03.offsetTop,
        behavior: "smooth",
    });
}
function scrollToSection3() {
    const contact__wrap = document.getElementById("contact__wrap");
    window.scrollTo({
        top: contact__wrap.offsetTop,
        behavior: "smooth",
    });
}
// 스크롤 이벤트가 발생할 때, 맨 위로 올라가는 버튼을 제어합니다.
window.addEventListener("scroll", function () {
    // 맨 위로 올라가는 버튼과 섹션 01을 가져옵니다.
    let btn = document.querySelector(".Top_btn");
    let section01 = document.querySelector("#section01");

    // 스크롤이 섹션 01의 높이보다 크면, 버튼을 보이게 합니다.
    if (window.pageYOffset > section01.offsetHeight) {
        btn.style.display = "block";
    } else {
        // 스크롤이 섹션 01의 높이보다 작으면, 버튼을 숨깁니다.
        btn.style.display = "none";
    }
    // 맨 위로 올라가는 버튼을 클릭하면 페이지 맨 위로 부드럽게 이동합니다.
    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// 슬라이드 시작
$(function () {
    let $slider = $(".portfolio_img_list"),
        $firstSlide = $slider
            .find("li")
            .first() // 첫번째 슬라이드
            .stop(true)
            .animate({ opacity: 1 }, 200); // 첫번째 슬라이드만 보이게 하기

    function AutoSlide() {
        stopSlide();
        startSlide(); //타이머 초기화
        $firstSlide = $slider
            .find("li")
            .first() // 첫 번째 슬라이드
            .appendTo($slider); // 맨 마지막으로 보내기
        let $lastSlide = $slider
            .find("li")
            .last() // 맨 마지막으로 보낸 슬라이드
            .stop(true)
            .animate({ opacity: 0 }, 400); // fadeOut시키기
        $firstSlide = $slider
            .find("li")
            .first() // 맨 처음 슬라이드
            .stop(true)
            .animate({ opacity: 1 }, 400); // fadeIn 시키기
    }

    startSlide(); // 자동 슬라이드 시작

    var theInterval;

    function startSlide() {
        theInterval = setInterval(AutoSlide, 5000); //자동 슬라이드 설정
    }

    function stopSlide() {
        //자동 멈추기
        clearInterval(theInterval);
    }

    $(".portfolio_img_list").hover(
        function () {
            //마우스 오버시 슬라이드 멈춤
            stopSlide();
        },
        function () {
            // 마우스 아웃시, 슬라이드를 다시 시작합니다.
            startSlide();
        }
    );
});

function btn(clickedDiv) {
    // 클릭된 div 요소의 id 값을 가져옴
    let id = clickedDiv.id;

    const links = [
        "https://nubeez.github.io/project_1",
        "https://nubeez.github.io/project_2",
        "https://nubeez.github.io/project_3",
        "https://nubeez.github.io/project_4",
        "https://nubeez.github.io/project_5",
        "https://nubeez.github.io/project_6",
    ];

    const contents = [".content_01", ".content_02", ".content_03", ".content_04", ".content_05", ".content_06"];

    // id 값에 따라 다른 동작을 수행
    switch (id) {
        case "info_menu_0":
            // 링크 정보를 변경
            $(".link_wrap").attr("href", links[0]);
            // 이미지 요소 정보를 변경
            $(".portfolio_img_list>li img").each((index, img) => {
                const newSrc = `project_img/One/one_${index + 1}.png`;
                $(img).attr("src", newSrc);
            });
            // 내용 요소 정보를 변경
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                $(content).css("display", i === 0 ? "inline-flex" : "none");
                // 인덱스가 0인 경우에는 보이도록 변경, 그 외의 경우에는 숨김
            }
            break;
        //   2번째버튼
        case "info_menu_1":
            // 링크 정보를 변경
            $(".link_wrap").attr("href", links[1]);
            // 이미지 요소 정보를 변경
            $("li img").each((index, img) => {
                const newSrc = `project_img/Two/two_${index + 1}.png`;
                $(img).attr("src", newSrc);
            });
            // 내용 요소 정보를 변경
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                $(content).css("display", i === 1 ? "inline-flex" : "none");
                // 인덱스가 1인 경우에는 보이도록 변경, 그 외의 경우에는 숨김
            }
            break;
        //   3번째버튼
        case "info_menu_2":
            // 링크 정보를 변경
            $(".link_wrap").attr("href", links[2]);
            // 이미지 요소 정보를 변경
            $("li img").each((index, img) => {
                const newSrc = `project_img/Three/three_${index + 1}.png`;
                $(img).attr("src", newSrc);
            });
            // 내용 요소 정보를 변경
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                $(content).css("display", i === 2 ? "inline-flex" : "none");
                // 인덱스가 2인 경우에는 보이도록 변경, 그 외의 경우에는 숨김
            }
            break;
        //   4번째버튼
        case "info_menu_3":
            // 링크 정보를 변경
            $(".link_wrap").attr("href", links[3]);
            // 이미지 요소 정보를 변경
            $("li img").each((index, img) => {
                const newSrc = `project_img/Four/four_${index + 1}.png`;
                $(img).attr("src", newSrc);
            });
            // 내용 요소 정보를 변경
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                $(content).css("display", i === 3 ? "inline-flex" : "none");
                // 인덱스가 3인 경우에는 보이도록 변경, 그 외의 경우에는 숨김
            }
            break;
        //   5번째버튼
        case "info_menu_4":
            // 링크 정보를 변경
            $(".link_wrap").attr("href", links[4]);
            // 이미지 요소 정보를 변경
            $("li img").each((index, img) => {
                const newSrc = `project_img/Five/five_${index + 1}.png`;
                $(img).attr("src", newSrc);
            });
            // 내용 요소 정보를 변경
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                $(content).css("display", i === 4 ? "inline-flex" : "none");
                // 인덱스가 4인 경우에는 보이도록 변경, 그 외의 경우에는 숨김
            }
            break;
        //   6번째버튼
        case "info_menu_5":
            // 링크 정보를 변경
            $(".link_wrap").attr("href", links[5]);
            // 이미지 요소 정보를 변경
            $("li img").each((index, img) => {
                const newSrc = `project_img/Six/six_${index + 1}.png`;
                $(img).attr("src", newSrc);
            });
            // 내용 요소 정보를 변경
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                $(content).css("display", i === 5 ? "inline-flex" : "none");
                // 인덱스가 5인 경우에는 보이도록 변경, 그 외의 경우에는 숨김
            }
            break;
        // 다른 id 값에 대한 동작 추가
        default:
            break;
    }
}
