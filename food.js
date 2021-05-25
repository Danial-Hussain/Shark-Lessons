// Food Agent
class Food{
    constructor(position, id){
        this.position = position;
        this.size = 30;
        this.timer = 0;
        this.flip = random([true, false]);
        this.id = id;
    }

    update(){
        this.timer += 1;
        if (this.timer % 200 == 0){
            this.flip = !this.flip;
        }
    }

    show(){
        if (this.flip == true){
            image(
                fish_r,
                this.position.x, 
                this.position.y, 
                this.size, 
                this.size
            );
        }
        else{
            image(
                fish_l, 
                this.position.x, 
                this.position.y, 
                this.size, 
                this.size
            );
        }
    }
}