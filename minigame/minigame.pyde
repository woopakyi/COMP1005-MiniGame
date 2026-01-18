add_library("minim")

def setup():
    global minim, dog, hurt, hurt0 ,heal, victory ,Save, lose, laz
    minim = Minim(this)
    dog = minim.loadFile("snd_dog0.wav")
    hurt = minim.loadFile("snd_hurt.wav")
    hurt0 = minim.loadFile("snd_hurt0.wav")
    heal = minim.loadFile("snd_heal.wav")
    victory = minim.loadFile("snd_victory.wav")
    Save = minim.loadFile("snd_save.wav")
    lose = minim.loadFile("snd_lose.wav")
    laz = minim.loadFile("snd_laz.wav")
    
    size(720,720)
    
    global soul_red, soul_blue, flowey_alive, flowey_dead, flowey_icon, asriel, toriel, chara, chara2, bg, dog1, dog2, bone
    soul_red = loadImage("soul_red.png")
    soul_blue = loadImage("soul_blue.png")
    flowey_alive = loadImage("flowey_alive.png")
    flowey_dead = loadImage("flowey_dead.png")
    flowey_icon = loadImage("flowey_icon.png")
    asriel = loadImage("asriel.png")
    toriel = loadImage("toriel.png")
    chara = loadImage("chara.png")
    chara2 = loadImage("chara2.png")
    bg = loadImage("bg.png")
    dog1 = loadImage("dog1.png")
    dog2 = loadImage("dog2.png")
    bone = loadImage("bone.png")
    
    global xf, yf, xfd, yfd, xto, yto, xb, yb, sb
    xf = []
    yf = []
    xfd = []
    yfd = []
    xto = []
    yto = []
    xb = []
    yb = []
    sb = []
    for i in range(3):
        xf.append(random(58,664))
        yf.append(random(61,390))
        xb.append(random(-270,-90))
        yb.append(random(44,407))
        sb.append(random(1,5))

    global lv, max_hp, hp, Exp, max_Exp, xas, yas, flower, xc, yc, speed
    lv = 1
    max_hp = lv*4 + 16
    hp = max_hp
    max_Exp = lv
    Exp = 0
    xas = random(54,667)
    yas = random(81,371)
    flower = 0
    xc = random(48,672)
    yc = random(58,394)
    speed = 3
    
    global startTime, stage, test, stopTime, currentTime, doggyTime
    startTime = millis()
    stage = 0
    stopTime = 0
    currentTime = 0
    doggyTime = 0
    test = False
    
def draw():
    if stage == 0:
        home()
    elif stage == 1:
        game()
    elif stage == 2:
        win()
    elif stage == 3:
        Lose()

def home():
    imageMode(CORNER)
    image(bg,0,0,width,height)
    global startTime
    startTime = millis()
    if startTime<doggyTime+300:
        image(dog1,40,40)
    else:
        image(dog2,20,40)
    fill(255)
    textSize(24)
    text("press key to test the volume of sound",85,65)
    #text("collect 2 flowers to feed 1 sheep",170,550)
    textSize(36)
    text("click anywhere to start the game",75,300)
    

def win():
    stroke(255)
    strokeWeight(3)
    fill(120)
    rect(100,100,525,250)
    fill(255)
    textSize(48)
    text("YOU WIN!", 250,210)
    textSize(30)
    text("You spent " + str(stopTime)+ "s to reach Lv20", 155,260)
    text("Press R to restart",250,300)
    victory.play()

            
def Lose():
    stroke(255)
    strokeWeight(3)
    fill(120)
    rect(100,100,525,250)
    fill(255)
    textSize(48)
    text("YOU LOSE!", 250,210)
    textSize(30)
    text("You have no HP left", 230,260)
    text("Press R to restart",250,300)
    lose.play()

def game():
    background(0)
    global xf, yf, xfd, yfd, xto, yto, lv, max_hp, hp, Exp, max_Exp, xas, yas, flower, xc, yc, speed, startTime, stage, stopTime,currentTime, doggyTime, xb, yb, sb
   
    line(721,0,721,720)
    imageMode(CENTER)
    x = min(max(mouseX, 38), 682)
    y = min(max(mouseY, 38), 412)

    
    for i in range(len(xfd)):
        image(flowey_dead, xfd[i], yfd[i], 60,66)
    for i in range(len(xto)):
        image(toriel, xto[i], yto[i], 50,104)
    for i in range(len(xf)):
        image(flowey_alive, xf[i], yf[i],60,66)
    image(asriel, xas, yas,40,67)
                
     #enemy
    if lv >= 10:
        if xc<x and xc<672:
            xc=xc+speed
        if xc>x and xc>48:
            xc=xc-speed
        if yc<y and yc<394:
            yc=yc+speed
        if yc>y and yc>58:
            yc=yc-speed

        if (x-10)<(xc+19) and (x+10)>(xc-19) and (y+10)>(yc-29) and (y-10)<(yc+29):
            image(chara2,xc,yc,38,58)
            if millis()-currentTime >=100:
                hp = hp - 1
                currentTime = millis()
                laz.play()
                laz.rewind()
        else:
            image(chara,xc,yc,38,58)

    #bone            
    if lv >= 5:    
        for i in range(len(xf)):
            xb[i]=xb[i]+sb[i]
            if xb[i]>width+90:
                xb[i]=(random(-270,-90))
                yb[i]=(random(44,407))
                sb[i]=(random(1,5))
            image(bone, xb[i], yb[i], 90,34)
            if (x-10)<(xb[i]+45) and (x+10)>(xb[i]-45) and (y+10)>(yb[i]-17) and (y-10)<(yb[i]+17):
                hp = max(hp-7,0)
                xb[i]=(random(-270,-90))
                yb[i]=(random(44,407))
                sb[i]=(random(1,5))            
                hurt0.play()
                hurt0.rewind()

    
    #heart
    imageMode(CENTER)
    if mousePressed:
        image(soul_blue,x,y,20,20)
    else:
        image(soul_red,x,y,20,20)
                

    #lv
    fill(255)
    rect(25,440,95,35,0,0,15,0)
    textSize(36)
    fill(0)
    text("Lv" + str(lv),30,470)
    if lv >=20 and stage == 1:
        stopTime = (millis() - startTime)/1000
        stage = 2

    
    #hp
    textSize(24)
    fill(255)
    text(str(hp)+"/"+str(max_hp),395,465)
    text("HP",145,465)
    noStroke()
    fill(170,0,0)
    rect(180,445,210,25)
    fill(255,255,0)
    if hp>0:
        rect(180,445,210*hp/max_hp,25)
    else:
        stage = 3
    
    
    #exp    
    if Exp >= max_Exp:
        lv = lv + 1
        Exp = Exp - max_Exp
        max_Exp = lv
        max_hp = lv*4 + 16
        hp = max_hp
    fill(255)
    rect(492,440,205,33,0,0,0,10)
    textSize(24)
    fill(0)
    text("EXP",500,465)
    textSize(20)
    text(str(Exp)+"/"+str(max_Exp),630,463)
    rect(545,446,82,22)
    fill(0,255,255)
    rect(545,446,82*Exp/max_Exp,22)
    
    
    #time and others
    stroke(255,100,0)
    strokeWeight(2)
    noFill()
    fill(0)
    rect(330,490,300,60)
    rect(100,490,210,60)
    fill(255,100,0)
    textSize(48)
    text("TIME:"+str((millis() - startTime)/1000)+"s",345,538)
    image(flowey_icon,125,520)
    for i in range(8):
        fill(55)
        rect(148+i*20,500,15,40)
    for i in range(flower):
        fill(255,100,0)
        noStroke()
        rect(148+i*20,500,15,40)
    stroke(255)
    strokeWeight(6)
    noFill()
    rect(25,25,670,400)
    
    #below area
    stroke(255)
    strokeWeight(3)
    fill(55)
    rect(25,570,670,120,20)
    textSize(24)
    fill(255)
    text("Collect 2 flowers to feed 1 sheep",40,605)
    text("Flower = 2Exp. Sheep = 10Exp",40,635)
    text("Aim: reach Lv20, avoid enemy and bones",40,665)
    
def mousePressed():
    global flower, xas, yas, tox, toy, Exp, stage, startTime
    if stage == 0:
        stage = 1
        startTime = millis()
        Save.play()
    elif stage == 1:
        if (mouseX-10)<(xas+20) and (mouseX+10)>(xas-20) and (mouseY+10)>(yas-32) and (mouseY-10)<(yas+32) and flower>=2:
            xto.append(xas)
            yto.append(yas)
            xas = random(54,667)
            yas = random(81,371)
            Exp = Exp + 10
            flower = flower-2
            heal.play()
            heal.rewind()
    
        for i in range (len(xf)):
            if (mouseX-10)<(xf[i]+30) and (mouseX+10)>(xf[i]-30) and (mouseY+10)>(yf[i]-33) and (mouseY-10)<(yf[i]+33):
                xfd.append(xf[i])
                yfd.append(yf[i])
                Exp = Exp + 2
                flower = min(8, flower+1)
                xf[i] = random(58,664)
                yf[i] = random(61,390)
                hurt.play()
                hurt.rewind()

def keyPressed():
    global lv, stage, hp, doggyTime
    if stage == 0:
        doggyTime = startTime
        dog.play()
        dog.rewind()
    elif (key == "r" or key == "R") and (hp<=0 or lv>=20 or test == True):
        setup()
    elif key == "l" and test == True:
        lv = 20
    elif key == "h" and test == True:
        hp = 0
        
