
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const imgs = section.querySelectorAll(".front_img");
        const imgCount = imgs.length; // 추가된 변수
        const content00 = section.querySelector(".content00");
        const content01 = section.querySelector(".content01");
        const text = section.querySelector('.front_title');

        setInterval(function () {
            if (content00) { // content00가 존재할 경우에만 gsap.to() 실행
                gsap.to(content00, {
                    y: 0,
                    opacity: 0,
                    duration: 3
                });
            }

            if (content01) { // content01이 존재할 경우에만 gsap.to() 실행
                gsap.to(content01, {
                    y: 0,
                    opacity: 1,
                    duration: 3
                });
            }
        }, 4000);

        // section08 하단 텍스트
        gsap.fromTo(text, {
            x: "-100%"
        }, {
            x: "20%",
            duration: 2,
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 이미지 스크롤 트리거 시작
        imgs.forEach((img, index) => {
            // 각 이미지의 위치를 중앙으로 맞추기 위해 사용됩니다.
            const offset = ((index - (imgCount - 1) / 2) / imgCount) * window.innerWidth * 0.2;

            // Section03, Section05, Section07은 왼쪽으로 이동합니다.
            if (section.id === "section03" || section.id === "section05" || section.id === "section07") {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        imgs.forEach((img, index) => {
                            const offset = ((3) / imgCount) * window.innerWidth * 0.6;
                            gsap.set(img, {
                                x: -(self.progress) * offset // x 좌표값에 음수를 취해 이미지를 왼쪽으로 이동합니다.
                            });
                        });
                    }
                });
            } else { // 나머지는 오른쪽으로 이동합니다.
                ScrollTrigger.create({
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        imgs.forEach((img, index) => {
                            const offset = ((3) / imgCount) * window.innerWidth * 0.6;
                            gsap.set(img, {
                                x: (self.progress) * offset // x 좌표값에 양수를 취해 이미지를 오른쪽으로 이동합니다.
                            });
                        });
                    }
                });
            }
        });
    });
    // 로딩창 숨기는 함수
    function hideLoading() {
        // 로딩창 요소 가져오기
        const loading = document.getElementById('loading');
        // 로딩창 요소 애니메이션 효과 추가
        gsap.to(loading, {
            opacity: 0,
            delay: 2, // 3초 후에 로딩창을 제거합니다.
            duration: 0.5,
            onComplete: function () {
                // 애니메이션 완료 후 로딩창 요소 제거
                loading.parentNode.removeChild(loading);
            }
        });
    }

    // 모든 리소스가 로드된 후 로딩창 숨기는 코드
    window.addEventListener('load', hideLoading);

    // 스크롤이 section02에 도달하면 애니메이션을 실행합니다.
    const content02 = document.querySelector('.content02');
    const typing = document.querySelector('.typing');

    function playAnimation() {
        typing.classList.add('playing');
    }

    function pauseAnimation() {
        typing.classList.remove('playing');
    }

    function handleScroll() {
        const contentRect = content02.getBoundingClientRect();
        const isContentVisible = contentRect.top < window.innerHeight && contentRect.bottom > 0;

        if (isContentVisible) {
            playAnimation();
        } else {
            pauseAnimation();
        }
    }

    window.addEventListener('scroll', handleScroll);

    // 메뉴중에 프로젝트를 클릭하면 처음 프로젝트로 이동합니다.
    function scrollToSection1() {
        const section02 = document.getElementById("section02");
        window.scrollTo({
            top: section02.offsetTop,
            behavior: "smooth"
        });
    }
    function scrollToSection2() {
        const section03 = document.getElementById("section03");
        window.scrollTo({
            top: section03.offsetTop,
            behavior: "smooth"
        });
    }
    function scrollToSection3() {
        const contact__wrap = document.getElementById("contact__wrap");
        window.scrollTo({
            top: contact__wrap.offsetTop,
            behavior: "smooth"
        });
    }