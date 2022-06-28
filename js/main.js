window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    c = canvas.getContext('2d');
    
    window.addEventListener('resize', function(){
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    
        initCanvas();
    });
    
    var mouse = {
        x: undefined,
        y: undefined
    }
    window.addEventListener('mousemove',
        function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
            drawCircles();
        }
    )
    window.addEventListener("touchmove", 
        function (event) {
            let touch = event.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
            drawCircles();
        }
    )
    
    function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.vx = vx;
        this.vy = vy;
        this.birth = birth;
        this.life = life;
        this.opacity = opacity;
    
        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            c.fillStyle = 'rgba(' + rgb +','+ this.opacity +')';
            c.fill();
        }
    
        this.update = function(){
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.vx = -this.vx;
            }
    
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.vy = -this.vy;
            }
    
            this.x += this.vx;
            this.y += this.vy;
    
            this.opacity = 1- (((frame - this.birth) * 1) / this.life);
    
            if (frame > this.birth + this.life){
                for (let i = 0; i < circleArray.length; i++){
                    if (this.birth == circleArray[i].birth && this.life == circleArray[i].life){
                        circleArray.splice(i, 1);
                        break;
                    }
                }
            } else{
                this.draw();
            }
        }
    
    }
    
    var circleArray = [];
    
    function initCanvas() {
        circleArray = [];
    }
    
    var colorArray = [
        '33,255,114',
        '0,0,0',
        '255,255,255'
    ]
    
    function drawCircles(){
        for (let i = 0; i < 6; i++) {
            let radius = Math.floor(Math.random() * 4) + 2;
            let vx = (Math.random() * 2) - 1;
            let vy = (Math.random() * 2) - 1;
            let spawnFrame = frame;
            let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
            let life = 100;
            circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));
        }
    }
    
    var frame = 0;
    function animate() {
        requestAnimationFrame(animate);
        frame += 1;
        c.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < circleArray.length; i++ ){
            circleArray[i].update();
        }
        
    }
    initCanvas();
    animate();
    
  

  setTimeout( function(){ 
    $(".animate__animated").removeClass("animate__bounceIn");
    $(".animate__animated").removeClass("animate__rollIn");
  }  , 6000 );

  $(".portfolio_link_wrapper").on('mouseover', function(){
    $(this).find('a').fadeIn();
  });

  $("#drop_menu").on('click', function(e){
    e.preventDefault();
    $('.left_sidebar').toggleClass("active_drop_menu");
  });

}
    
$(window).on('resize scroll', function() {
    if ($('.portfolio_heading').isInViewport()) {
        $('.portfolio_heading span').addClass('animate__bounceIn');
        $('.portfolio_container p').addClass('animate__fadeInUp');
    }

    if ($('.portfolio_links').isInViewport()) {
        $('.portfolio_links').addClass('animate__fadeInUp');
    }

    if ($('.about_heading').isInViewport()) {
        $('.about_heading span').addClass('animate__bounceIn');
        $('.about_text > p').addClass('animate__fadeInUp');
        $('.globe_text').addClass('animate__fadeInUp');
    }
    
    if ($('.contact_text').isInViewport()) {
        $('.contact_text span').addClass('animate__bounceIn');
        $('.contact_text p').addClass('animate__fadeInUp');
        $('.contact_text .contact_form').addClass('animate__fadeInUp');
        $('.contact_map').addClass('animate__fadeInUp');
    }
    
});