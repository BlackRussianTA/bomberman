var frames = {
    "backgroundLighter ":
    {
        "frame": {"x":0,"y":0,"w":1920,"h":1080}
    },
    "brickBlack001":
    {
        "frame": {"x":0,"y":1080,"w":144,"h":144}
    },
    "brickBlack002":
    {
        "frame": {"x":144,"y":1080,"w":144,"h":144}
    },
    "brickBlack003":
    {
        "frame": {"x":288,"y":1080,"w":144,"h":144}
    },
    "brickBlack004":
    {
        "frame": {"x":432,"y":1080,"w":144,"h":144}
    },
    "brickBlack005":
    {
        "frame": {"x":576,"y":1080,"w":144,"h":144}
    },
    "brickBlack006":
    {
        "frame": {"x":720,"y":1080,"w":144,"h":144}
    },
    "coin001":
    {
        "frame": {"x":864,"y":1080,"w":144,"h":144}
    },
    "coin002":
    {
        "frame": {"x":1008,"y":1080,"w":144,"h":144}
    },
    "coin003":
    {
        "frame": {"x":1152,"y":1080,"w":144,"h":144}
    },
    "coin004":
    {
        "frame": {"x":1296,"y":1080,"w":144,"h":144}
    },
    "coin005":
    {
        "frame": {"x":1440,"y":1080,"w":144,"h":144}
    },
    "coin006":
    {
        "frame": {"x":1584,"y":1080,"w":144,"h":144}
    },
    "coin007":
    {
        "frame": {"x":1728,"y":1080,"w":144,"h":144},
    },
    "coin008":
    {
        "frame": {"x":0,"y":1224,"w":144,"h":144},
    },
    "coin009":
    {
        "frame": {"x":144,"y":1224,"w":144,"h":144},
    },
    "coin010":
    {
        "frame": {"x":288,"y":1224,"w":144,"h":144},
    },
    "enemy1Move001":
    {
        "frame": {"x":432,"y":1224,"w":144,"h":144},
    },
    "enemy1Move002":
    {
        "frame": {"x":576,"y":1224,"w":144,"h":144},
    },
    "enemy1Move003":
    {
        "frame": {"x":720,"y":1224,"w":144,"h":144},
    },
    "enemy1Move004":
    {
        "frame": {"x":864,"y":1224,"w":144,"h":144},
    },
    "enemy2Move001":
    {
        "frame": {"x":1008,"y":1224,"w":144,"h":108},
    },
    "enemy2Move002":
    {
        "frame": {"x":1152,"y":1224,"w":144,"h":108},
    },
    "enemy2Move003":
    {
        "frame": {"x":1296,"y":1224,"w":144,"h":108},
    },
    "enemy2Move004":
    {
        "frame": {"x":1440,"y":1224,"w":144,"h":108},
    },
    "gate001":
    {
        "frame": {"x":1584,"y":1224,"w":144,"h":144},
    },
    "gate002":
    {
        "frame": {"x":1728,"y":1224,"w":144,"h":144},
    },
    "gate003":
    {
        "frame": {"x":0,"y":1368,"w":144,"h":144},
    },
    "gate004":
    {
        "frame": {"x":144,"y":1368,"w":144,"h":144},
    },
    "ice001":
    {
        "frame": {"x":288,"y":1368,"w":144,"h":144},
    },
    "ice002":
    {
        "frame": {"x":432,"y":1368,"w":144,"h":144},
    },
    "ice003":
    {
        "frame": {"x":576,"y":1368,"w":144,"h":144},
    },
    "ice004":
    {
        "frame": {"x":720,"y":1368,"w":144,"h":144},
    },
    "playerWalkFront001":
    {
        "frame": {"x":864,"y":1368,"w":144,"h":144},
    },
    "playerWalkFront002":
    {
        "frame": {"x":1008,"y":1368,"w":144,"h":144},
    },
    "playerWalkFront003":
    {
        "frame": {"x":1152,"y":1368,"w":144,"h":144},
    },
    "playerWalkFront004":
    {
        "frame": {"x":1296,"y":1368,"w":144,"h":144},
    },
    "playerWalkFront005":
    {
        "frame": {"x":1440,"y":1368,"w":144,"h":144},
    },
    "playerWalkFront006":
    {
        "frame": {"x":1584,"y":1368,"w":144,"h":144},
    }
}


var animationPlayer = {
        idle: [
            frames.playerWalkFront001.frame.x,
            frames.playerWalkFront001.frame.y,
            frames.playerWalkFront001.frame.w,
            frames.playerWalkFront001.frame.h,

            frames.playerWalkFront002.frame.x,
            frames.playerWalkFront002.frame.y,
            frames.playerWalkFront002.frame.w,
            frames.playerWalkFront002.frame.h,

            frames.playerWalkFront003.frame.x,
            frames.playerWalkFront003.frame.y,
            frames.playerWalkFront003.frame.w,
            frames.playerWalkFront003.frame.h,

            frames.playerWalkFront004.frame.x,
            frames.playerWalkFront004.frame.y,
            frames.playerWalkFront004.frame.w,
            frames.playerWalkFront004.frame.h,

            frames.playerWalkFront005.frame.x,
            frames.playerWalkFront005.frame.y,
            frames.playerWalkFront005.frame.w,
            frames.playerWalkFront005.frame.h,

            frames.playerWalkFront006.frame.x,
            frames.playerWalkFront006.frame.y,
            frames.playerWalkFront006.frame.w,
            frames.playerWalkFront006.frame.h
        ]
    },
    animationEnemyOne = {
        move: [
            frames.enemy1Move001.frame.x,
            frames.enemy1Move001.frame.y,
            frames.enemy1Move001.frame.w,
            frames.enemy1Move001.frame.h,

            frames.enemy1Move002.frame.x,
            frames.enemy1Move002.frame.y,
            frames.enemy1Move002.frame.w,
            frames.enemy1Move002.frame.h,

            frames.enemy1Move003.frame.x,
            frames.enemy1Move003.frame.y,
            frames.enemy1Move003.frame.w,
            frames.enemy1Move003.frame.h,

            frames.enemy1Move004.frame.x,
            frames.enemy1Move004.frame.y,
            frames.enemy1Move004.frame.w,
            frames.enemy1Move004.frame.h
        ]
    },
    animationEnemyTwo = {
        move: [
            frames.enemy2Move001.frame.x,
            frames.enemy2Move001.frame.y,
            frames.enemy2Move001.frame.w,
            frames.enemy2Move001.frame.h,

            frames.enemy2Move002.frame.x,
            frames.enemy2Move002.frame.y,
            frames.enemy2Move002.frame.w,
            frames.enemy2Move002.frame.h,

            frames.enemy2Move003.frame.x,
            frames.enemy2Move003.frame.y,
            frames.enemy2Move003.frame.w,
            frames.enemy2Move003.frame.h,

            frames.enemy2Move004.frame.x,
            frames.enemy2Move004.frame.y,
            frames.enemy2Move004.frame.w,
            frames.enemy2Move004.frame.h
        ]
    },
    animationIce = {
        idle: [
            frames.ice001.frame.x,
            frames.ice001.frame.y,
            frames.ice001.frame.w,
            frames.ice001.frame.h,

            frames.ice002.frame.x,
            frames.ice002.frame.y,
            frames.ice002.frame.w,
            frames.ice002.frame.h,

            frames.ice003.frame.x,
            frames.ice003.frame.y,
            frames.ice003.frame.w,
            frames.ice003.frame.h,

            frames.ice004.frame.x,
            frames.ice004.frame.y,
            frames.ice004.frame.w,
            frames.ice004.frame.h
        ]
    },
    animationGate = {
        open: [
            frames.gate001.frame.x,
            frames.gate001.frame.y,
            frames.gate001.frame.w,
            frames.gate001.frame.h,

            frames.gate002.frame.x,
            frames.gate002.frame.y,
            frames.gate002.frame.w,
            frames.gate002.frame.h,

            frames.gate003.frame.x,
            frames.gate003.frame.y,
            frames.gate003.frame.w,
            frames.gate003.frame.h,

            frames.gate004.frame.x,
            frames.gate004.frame.y,
            frames.gate004.frame.w,
            frames.gate004.frame.h
        ],
        locked: [
            frames.brickBlack001.frame.x,
            frames.brickBlack001.frame.y,
            frames.brickBlack001.frame.w,
            frames.brickBlack001.frame.h

            //frames.brickBlack002.frame.x,
            //frames.brickBlack002.frame.y,
            //frames.brickBlack002.frame.w,
            //frames.brickBlack002.frame.h,
            //
            //frames.brickBlack003.frame.x,
            //frames.brickBlack003.frame.y,
            //frames.brickBlack003.frame.w,
            //frames.brickBlack003.frame.h,
            //
            //frames.brickBlack004.frame.x,
            //frames.brickBlack004.frame.y,
            //frames.brickBlack004.frame.w,
            //frames.brickBlack004.frame.h,
            //
            //frames.brickBlack005.frame.x,
            //frames.brickBlack005.frame.y,
            //frames.brickBlack005.frame.w,
            //frames.brickBlack005.frame.h,
            //
            //frames.brickBlack006.frame.x,
            //frames.brickBlack006.frame.y,
            //frames.brickBlack006.frame.w,
            //frames.brickBlack006.frame.h
        ]
    },
    animationBox = {
        stone: [
            frames.brickBlack001.frame.x,
            frames.brickBlack001.frame.y,
            frames.brickBlack001.frame.w,
            frames.brickBlack001.frame.h

            //frames.brickBlack002.frame.x,
            //frames.brickBlack002.frame.y,
            //frames.brickBlack002.frame.w,
            //frames.brickBlack002.frame.h,
            //
            //frames.brickBlack003.frame.x,
            //frames.brickBlack003.frame.y,
            //frames.brickBlack003.frame.w,
            //frames.brickBlack003.frame.h,
            //
            //frames.brickBlack004.frame.x,
            //frames.brickBlack004.frame.y,
            //frames.brickBlack004.frame.w,
            //frames.brickBlack004.frame.h
        ],
        brick: [
            frames.brickBlack004.frame.x,
            frames.brickBlack004.frame.y,
            frames.brickBlack004.frame.w,
            frames.brickBlack004.frame.h
        ]
    },
    animationFire = {
        idle: [
            frames.ice001.frame.x,
            frames.ice001.frame.y,
            frames.ice001.frame.w,
            frames.ice001.frame.h,

            frames.ice002.frame.x,
            frames.ice002.frame.y,
            frames.ice002.frame.w,
            frames.ice002.frame.h,

            frames.ice003.frame.x,
            frames.ice003.frame.y,
            frames.ice003.frame.w,
            frames.ice003.frame.h,

            frames.ice004.frame.x,
            frames.ice004.frame.y,
            frames.ice004.frame.w,
            frames.ice004.frame.h
        ]
    },
    animationCoin = {
        idle: [
            frames.coin001.frame.x,
            frames.coin001.frame.y,
            frames.coin001.frame.w,
            frames.coin001.frame.h,

            frames.coin002.frame.x,
            frames.coin002.frame.y,
            frames.coin002.frame.w,
            frames.coin002.frame.h,

            frames.coin003.frame.x,
            frames.coin003.frame.y,
            frames.coin003.frame.w,
            frames.coin003.frame.h,

            frames.coin004.frame.x,
            frames.coin004.frame.y,
            frames.coin004.frame.w,
            frames.coin004.frame.h,

            frames.coin005.frame.x,
            frames.coin005.frame.y,
            frames.coin005.frame.w,
            frames.coin005.frame.h,

            frames.coin006.frame.x,
            frames.coin006.frame.y,
            frames.coin006.frame.w,
            frames.coin006.frame.h,

            frames.coin007.frame.x,
            frames.coin007.frame.y,
            frames.coin007.frame.w,
            frames.coin007.frame.h,

            frames.coin008.frame.x,
            frames.coin008.frame.y,
            frames.coin008.frame.w,
            frames.coin008.frame.h,

            frames.coin009.frame.x,
            frames.coin009.frame.y,
            frames.coin009.frame.w,
            frames.coin009.frame.h,

            frames.coin010.frame.x,
            frames.coin010.frame.y,
            frames.coin010.frame.w,
            frames.coin010.frame.h
        ]
    },
    animationBomb = {
        idle: [
            frames.ice001.frame.x,
            frames.ice001.frame.y,
            frames.ice001.frame.w,
            frames.ice001.frame.h,

            frames.ice002.frame.x,
            frames.ice002.frame.y,
            frames.ice002.frame.w,
            frames.ice002.frame.h,

            frames.ice003.frame.x,
            frames.ice003.frame.y,
            frames.ice003.frame.w,
            frames.ice003.frame.h,

            frames.ice004.frame.x,
            frames.ice004.frame.y,
            frames.ice004.frame.w,
            frames.ice004.frame.h
        ]
    },
    animationBackground = {
        move: [
            0, 0, 1920, 1080,
            1, 1, 1920, 1080,
            2, 2, 1920, 1080,
            3, 3, 1920, 1080,
            4, 4, 1920, 1080,
            5, 5, 1920, 1080,
            6, 6, 1920, 1080,
            7, 7, 1920, 1080,
            8, 8, 1920, 1080,
            9, 9, 1920, 1080,
            10, 10, 1920, 1080,
            11, 11, 1920, 1080,
            12, 12, 1920, 1080,
            13, 13, 1920, 1080,
            14, 14, 1920, 1080,
            15, 15, 1920, 1080,
            16, 16, 1920, 1080,
            17, 17, 1920, 1080,
            18, 18, 1920, 1080,
            19, 19, 1920, 1080,
            20, 20, 1920, 1080,
            21, 21, 1920, 1080,
            22, 22, 1920, 1080,
            23, 23, 1920, 1080,
            24, 24, 1920, 1080,
            25, 25, 1920, 1080,
            26, 26, 1920, 1080,
            27, 27, 1920, 1080,
            28, 28, 1920, 1080,
            29, 29, 1920, 1080,
            30, 30, 1920, 1080,
            31, 31, 1920, 1080,
            32, 32, 1920, 1080,
            33, 33, 1920, 1080,
            34, 34, 1920, 1080,
            35, 35, 1920, 1080,
            36, 36, 1920, 1080,
            37, 37, 1920, 1080,
            38, 38, 1920, 1080,
            39, 39, 1920, 1080,
            40, 40, 1920, 1080,
            41, 41, 1920, 1080,
            42, 42, 1920, 1080,
            43, 43, 1920, 1080,
            44, 44, 1920, 1080,
            45, 45, 1920, 1080,
            46, 46, 1920, 1080,
            47, 47, 1920, 1080,
            48, 48, 1920, 1080,
            49, 49, 1920, 1080,
            50, 50, 1920, 1080,
            51, 51, 1920, 1080,
            52, 52, 1920, 1080,
            53, 53, 1920, 1080,
            54, 54, 1920, 1080,
            55, 55, 1920, 1080,
            56, 56, 1920, 1080,
            57, 57, 1920, 1080,
            58, 58, 1920, 1080,
            59, 59, 1920, 1080,
            60, 60, 1920, 1080,
            61, 61, 1920, 1080,
            62, 62, 1920, 1080,
            63, 63, 1920, 1080,
            64, 64, 1920, 1080,
            65, 65, 1920, 1080,
            66, 66, 1920, 1080,
            67, 67, 1920, 1080,
            68, 68, 1920, 1080,
            69, 69, 1920, 1080,
            70, 70, 1920, 1080,
            71, 71, 1920, 1080,
            72, 72, 1920, 1080,
            73, 73, 1920, 1080,
            74, 74, 1920, 1080,
            75, 75, 1920, 1080,
            76, 76, 1920, 1080,
            77, 77, 1920, 1080,
            78, 78, 1920, 1080,
            79, 79, 1920, 1080,
            80, 80, 1920, 1080,
            81, 81, 1920, 1080,
            82, 82, 1920, 1080,
            83, 83, 1920, 1080,
            84, 84, 1920, 1080,
            85, 85, 1920, 1080,
            86, 86, 1920, 1080,
            87, 87, 1920, 1080,
            88, 88, 1920, 1080,
            89, 89, 1920, 1080,
            90, 90, 1920, 1080,
            91, 91, 1920, 1080,
            92, 92, 1920, 1080,
            93, 93, 1920, 1080,
            94, 94, 1920, 1080,
            95, 95, 1920, 1080,
            96, 96, 1920, 1080,
            97, 97, 1920, 1080,
            98, 98, 1920, 1080,
            99, 99, 1920, 1080,
            100, 100, 1920, 1080,
            100, 100, 1920, 1080,
            99, 99, 1920, 1080,
            98, 98, 1920, 1080,
            97, 97, 1920, 1080,
            96, 96, 1920, 1080,
            95, 95, 1920, 1080,
            94, 94, 1920, 1080,
            93, 93, 1920, 1080,
            92, 92, 1920, 1080,
            91, 91, 1920, 1080,
            90, 90, 1920, 1080,
            89, 89, 1920, 1080,
            88, 88, 1920, 1080,
            87, 87, 1920, 1080,
            86, 86, 1920, 1080,
            85, 85, 1920, 1080,
            84, 84, 1920, 1080,
            83, 83, 1920, 1080,
            82, 82, 1920, 1080,
            81, 81, 1920, 1080,
            80, 80, 1920, 1080,
            79, 79, 1920, 1080,
            78, 78, 1920, 1080,
            77, 77, 1920, 1080,
            76, 76, 1920, 1080,
            75, 75, 1920, 1080,
            74, 74, 1920, 1080,
            73, 73, 1920, 1080,
            72, 72, 1920, 1080,
            71, 71, 1920, 1080,
            70, 70, 1920, 1080,
            69, 69, 1920, 1080,
            68, 68, 1920, 1080,
            67, 67, 1920, 1080,
            66, 66, 1920, 1080,
            65, 65, 1920, 1080,
            64, 64, 1920, 1080,
            63, 63, 1920, 1080,
            62, 62, 1920, 1080,
            61, 61, 1920, 1080,
            60, 60, 1920, 1080,
            59, 59, 1920, 1080,
            58, 58, 1920, 1080,
            57, 57, 1920, 1080,
            56, 56, 1920, 1080,
            55, 55, 1920, 1080,
            54, 54, 1920, 1080,
            53, 53, 1920, 1080,
            52, 52, 1920, 1080,
            51, 51, 1920, 1080,
            50, 50, 1920, 1080,
            49, 49, 1920, 1080,
            48, 48, 1920, 1080,
            47, 47, 1920, 1080,
            46, 46, 1920, 1080,
            45, 45, 1920, 1080,
            44, 44, 1920, 1080,
            43, 43, 1920, 1080,
            42, 42, 1920, 1080,
            41, 41, 1920, 1080,
            40, 40, 1920, 1080,
            39, 39, 1920, 1080,
            38, 38, 1920, 1080,
            37, 37, 1920, 1080,
            36, 36, 1920, 1080,
            35, 35, 1920, 1080,
            34, 34, 1920, 1080,
            33, 33, 1920, 1080,
            32, 32, 1920, 1080,
            31, 31, 1920, 1080,
            30, 30, 1920, 1080,
            29, 29, 1920, 1080,
            28, 28, 1920, 1080,
            27, 27, 1920, 1080,
            26, 26, 1920, 1080,
            25, 25, 1920, 1080,
            24, 24, 1920, 1080,
            23, 23, 1920, 1080,
            22, 22, 1920, 1080,
            21, 21, 1920, 1080,
            20, 20, 1920, 1080,
            19, 19, 1920, 1080,
            18, 18, 1920, 1080,
            17, 17, 1920, 1080,
            16, 16, 1920, 1080,
            15, 15, 1920, 1080,
            14, 14, 1920, 1080,
            13, 13, 1920, 1080,
            12, 12, 1920, 1080,
            11, 11, 1920, 1080,
            10, 10, 1920, 1080,
            9, 9, 1920, 1080,
            8, 8, 1920, 1080,
            7, 7, 1920, 1080,
            6, 6, 1920, 1080,
            5, 5, 1920, 1080,
            4, 4, 1920, 1080,
            3, 3, 1920, 1080,
            2, 2, 1920, 1080,
            1, 1, 1920, 1080,
            0, 0, 1920, 1080
        ]
    }
