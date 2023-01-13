AFRAME.registerComponent("ball",{
    init:function(){
        this.shootBall()
    },

    shootBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                })
                ball.setAttribute("material",{
                    color:"blue"
                })

                var cam=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })

                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))

                var scene=document.querySelector("#scene")

                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0",
                })

                ball.addEventListener("collide",this.removeBall)
                scene.appendChild(ball)
            }
        })
    },

    removeBall:function(){
        var element=e.detail.target.el
        var elementHit=e.detail.body.el 

        if(elementHit.id.includes("box")){
            elementHit.setAttribute("material",{
                transparent:true,
                opacity:1
            })
        }

        var impulse=new CANNON.Vec3(-2,2,1)
        var worldPoint=new CANNON.Vec3().copy(elementHit.getAttribute("position"))

        elementHit.body.applyImpulse(impulse,worldPoint)
        element.removeEventListener("collide",this.shoot)

        var scene=document.querySelector("#scene")
        scene.removeChild(element)
    },


})