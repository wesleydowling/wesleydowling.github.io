class Particle {
  constructor(x, y, rand, img_, devWidth, devHeight) {
    this.origposition = createVector(x, y);
    this.position = createVector(map(x, 0, devWidth, 0, width), map(y, 0, devHeight, 0, height));
    this.velocity = createVector();
    this.velocity_v2 = createVector(random(-5, 5), random(-5, 5));
    this.acceleration = createVector();
    this.home = this.origposition.copy();
    this.lifespan = 0.0;
    this.fill_alpha = 0.0;
    this.rand = random(0, 100);
    this.randsize_vert = int(random(2, 3));
    this.randsize = int(random(3, 4));
    this.randsize2 = int(random(4, 6)); //4 to 8
    this.img = img_;
    this.size_v2 = skip;
    this.maxsize = width / this.randsize; //(skip / (particleßcount/1.5)) * 10.0 ;//random(1, 3) * (height/12) ;//40 //50;
    this.radius = 25;
    this.highlight = false;
    this.maxspeed = 1;
    this.maxforce = 1;
    this.resize = random(1, 3) * (1 / particlecount);
    this.strokeweight = 3.0;
    this.selected = false;
    this.period = (this.rand + 1) * 600;
    this.fillperiod = (this.rand + 1);
    this.amplitude = this.lifespan;
    this.local_force = true;
    this.origWidth = devWidth;
    this.origHeight = devHeight;
    this.aspect = devWidth / devHeight;
    this.aspect2 = devHeight / devWidth;
  }

  colour(rand) {


    if (this.rand > 0 && this.rand < 30) {
        this.c = color(240, 236, 0); // yellow
     } else if (this.rand > 30 && this.rand < 50) {
        this.c = color(255, 0, 120); //220, 0, 255) //magenta
      } else if (this.rand > 50 && this.rand < 70) {
        this.c = color(45, 255, 254); //191, 240, 255// /cyan
    } else if (this.rand > 70 && this.rand < 75) {
        this.c = color(0, 229, 108); //191, 240, 255// green
      } else if (this.rand > 75 && this.rand < 80) {
        this.c = color(253, 253, 253); // blue
      } else {
        this.c = color(253, 253, 253); // white
      }


      this.white = color(255); this.black = color(0);
      this.fill_col = lerpColor(this.white, this.c, map(this.lifespan, 100, 255, 0, 1)); //this.random_color_gen[rand];
      this.stroke_col = this.black;
      this.strokeweightlimit = strokew;
      this.strokeweight = map(this.lifespan,0,255,0,this.strokeweightlimit);
    }


    run() {
      this.update();
      this.display();
    }

    behaviors(px, py) {
      this.mouse = createVector(px, py);
      var flee = this.flee(this.mouse);
      flee.mult(-1.0);


      this.applyForce(flee);
    }

    flee() {
      var desired = p5.Vector.sub(this.mouse, this.position);
      var d = dist(this.mouse.x, this.mouse.y, this.position.x, this.position.y);
      this.mouseradius = eraser_size;
      this.positionradius = (this.size_v2 / 2);


      //var d = desired.mag();

      if (d < this.mouseradius + this.positionradius) {
        desired.setMag(this.maxspeed);
        desired.mult(10.0);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.local_force = true;
        return steer;
      } else {
        return createVector(0, 0);
      }
    }

    intersects(other) {
      this.dir = p5.Vector.sub(this.position, other.position);
      return (this.dir.magSq() < ((this.size_v2) * (this.size_v2)) && this.local_force == true &&
        this.position.x !== 0 && this.position.x !== width && this.position.y !== 0 && this.position.y !== height);
    }

    intersectForce() {
      this.power = 1000;
      let d = this.dir.mag(); // Distance between objects
      this.dir.normalize(); // Normalize vector (distance doesn't matter here, we just want this vector for direction)
      d = constrain(d, 5, 100); // Keep distance within a reasonable range
      let force = 1 * this.power / (d * d); // Repelling force is inversely proportional to distance
      this.dir.mult(force); // Get force vector --> magnitude * direction
      //  return dir;
      //this.dir.setMag(0.01);
      this.applyForce(this.dir);
    }

    applyForce(f) {
      this.acceleration.add(f);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.lifespan -= 0.0;
      this.velocity.limit(this.maxspeed);

      this.home.x = map(this.origposition.x, 0, this.origWidth, 0, width);
      this.home.y = map(this.origposition.y, 0, this.origHeight, 0, height);

      if (this.home.y < 0 || this.home.y > height) {
        this.home.y = constrain(this.home.y, 0, height - (this.rand));
      }

      if (this.home.x < 0 || this.home.x > width) {
        this.home.x = constrain(this.home.x, 0, width - (this.rand));
      }

      if (particlecount >= 30) {
        this.randsize = this.randsize2;
      }

      if (particlecount <= 100 && windowWidth < windowHeight) {
        this.randsize = this.randsize_vert;

      }

      this.maxsize = width / this.randsize;

      this.colour(this.rand);
      this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);

      this.stroke_alpha_osc = 0.0; //0.1 * this.amplitude * sin(TWO_PI * frameCount / this.period);
      this.fill_alpha_osc = 0.0; //*  (this.amplitude / 3.75) * cos(TWO_PI * frameCount / this.fillperiod);

      if (this.local_force == true) {
        this.velocity = this.velocity_v2;
      }


      if (this.size_v2 > this.maxsize) {
        this.size_v2 -= this.resize;

      }

      if (this.size_v2 < this.maxsize) {
        this.size_v2 += this.resize;

      }


      if (this.lifespan >= 0.0 && this.lifespan <= 255) {
        this.lifespan += 2.0;
      }
      if (this.fill_alpha >= 0.0 && this.fill_alpha <= 255) {
        this.fill_alpha += 2.0;
      }

      if (pixelShaderToggle && this.fill_alpha > 30 && this.lifespan > 30 && this.local_force == false) {
        this.lifespan -= 2.0
        this.fill_alpha -= 2.0;
        //this.strokeweight += 1.0;
      }

      if (instruction_toggle) {
        this.local_force = false;
      } else {
        this.local_force = true;
      }

      if (particlecount < 20) {

        if (this.position.x < 0) {
          this.velocity.mult(-1);
        } else if (this.position.x > width) {
          this.velocity.mult(-1);
        } else if (this.position.y < 0) {
          this.velocity.mult(-1);
        } else if (this.position.y > height) {
          this.velocity.mult(-1);
        }
      } else {

        if (this.position.y < 0 - (this.size_v2)) {
          this.position.y = height + (this.size_v2);
        }

        if (this.position.y > height + (this.size_v2)) {
          this.position.y = 0 - (this.size_v2);
        }
        if (this.position.x < 0 - (this.size_v2 * this.aspect)) {
          this.position.x = width + (this.size_v2 * this.aspect);
        }

        if (this.position.x > width + (this.size_v2 * this.aspect)) {
          this.position.x = 0 - (this.size_v2 * this.aspect);
        }
      }

    }

    // Method to display
    display() {


      if (this.d > 0.05 && mouseIsPressed) {
        this.local_force = false;
      }

      this.fill_col.setAlpha(this.lifespan);
      this.stroke_col.setAlpha(map(this.lifespan,40,255,0,255));

      push();

      //  noStroke();
      stroke(this.stroke_col);
      fill(this.fill_col);
      strokeWeight(this.strokeweight);
      rectMode(CENTER); //or rect?
      if (windowWidth > windowHeight) {
        rect(this.position.x, this.position.y, (this.size_v2 * this.aspect), this.size_v2);
      } else {
        rect(this.position.x, this.position.y, this.size_v2, this.size_v2 * this.aspect2);
      }





      pop();
    }

    isDead() {
      if (reset == true) {
        return true;
      } else {
        return false;
      }
    }
  }
