// Real constellation patterns extracted from official star maps
// Exact coordinates and line connections from reference star chart
const CONSTELLATION_DATA = {
    'Orion': {
        description: 'The Hunter',
        stars: [
            { x: 155.7, y: 73.0, name: "Orion 1" },
            { x: 136.1, y: 40.0, name: "Orion 2" },
            { x: 150.3, y: 40.8, name: "Orion 3" },
            { x: 162.3, y: 76.4, name: "Orion 4" },
            { x: 148.0, y: 103.8, name: "Orion 5" },
            { x: 137.3, y: 117.2, name: "Orion 6" },
            { x: 92.6, y: 123.6, name: "Orion 7" },
            { x: 47.5, y: 100.8, name: "Orion 8" },
            { x: 53.0, y: 151.4, name: "Orion 9" },
            { x: 46.6, y: 147.0, name: "Orion 10" },
            { x: 42.0, y: 128.0, name: "Orion 11" },
            { x: 40.0, y: 119.9, name: "Orion 12" },
            { x: 41.1, y: 108.3, name: "Orion 13" },
            { x: 49.7, y: 80.6, name: "Orion 14" },
            { x: 61.9, y: 69.2, name: "Orion 15" },
            { x: 69.6, y: 68.1, name: "Orion 16" },
            { x: 76.8, y: 210.9, name: "Orion 17" },
            { x: 91.6, y: 176.0, name: "Orion 18" },
            { x: 102.8, y: 163.5, name: "Orion 19" },
            { x: 107.5, y: 102.1, name: "Orion 20" },
            { x: 115.8, y: 173.3, name: "Orion 21" },
            { x: 126.2, y: 219.7, name: "Orion 22" },
            { x: 109.1, y: 168.9, name: "Orion 23" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [8, 9], [9, 10], [10, 11], [11, 12], [12, 7], [7, 13], [13, 14], [14, 15], [16, 17], [17, 18], [18, 6], [6, 19], [19, 5], [5, 20], [20, 21], [20, 22], [22, 18]]
    },

    'Ursa Major': {
        description: 'The Great Bear (Big Dipper)',
        stars: [
            { x: 253.9, y: 76.2, name: "Major 1" },
            { x: 185.8, y: 47.9, name: "Major 2" },
            { x: 184.0, y: 80.1, name: "Major 3" },
            { x: 233.4, y: 96.2, name: "Major 4" },
            { x: 290.6, y: 82.6, name: "Major 5" },
            { x: 319.0, y: 88.8, name: "Major 6" },
            { x: 341.4, y: 122.5, name: "Major 7" },
            { x: 226.0, y: 131.7, name: "Major 8" },
            { x: 199.8, y: 219.8, name: "Major 9" },
            { x: 199.5, y: 229.2, name: "Major 10" },
            { x: 191.4, y: 151.4, name: "Major 11" },
            { x: 146.5, y: 169.4, name: "Major 12" },
            { x: 141.5, y: 160.9, name: "Major 13" },
            { x: 98.2, y: 40.0, name: "Major 14" },
            { x: 40.0, y: 54.1, name: "Major 15" },
            { x: 116.7, y: 64.1, name: "Major 16" },
            { x: 117.7, y: 94.0, name: "Major 17" },
            { x: 99.5, y: 108.3, name: "Major 18" },
            { x: 67.5, y: 130.1, name: "Major 19" },
            { x: 71.7, y: 135.4, name: "Major 20" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 5], [5, 6], [3, 7], [7, 8], [8, 9], [7, 10], [10, 11], [10, 12], [1, 13], [13, 14], [14, 15], [15, 2], [2, 16], [16, 17], [17, 18], [19, 17]]
    },

    'Draco': {
        description: 'The Dragon',
        stars: [
            { x: 299.6, y: 135.2, name: "Draco 1" },
            { x: 301.7, y: 167.5, name: "Draco 2" },
            { x: 283.9, y: 162.6, name: "Draco 3" },
            { x: 285.1, y: 145.4, name: "Draco 4" },
            { x: 353.3, y: 70.4, name: "Draco 5" },
            { x: 318.1, y: 48.4, name: "Draco 6" },
            { x: 269.2, y: 82.1, name: "Draco 7" },
            { x: 238.8, y: 107.3, name: "Draco 8" },
            { x: 223.7, y: 125.0, name: "Draco 9" },
            { x: 198.6, y: 122.6, name: "Draco 10" },
            { x: 143.9, y: 90.1, name: "Draco 11" },
            { x: 82.2, y: 57.7, name: "Draco 12" },
            { x: 40.0, y: 60.4, name: "Draco 13" },
            { x: 318.3, y: 40.0, name: "Draco 14" },
            { x: 377.4, y: 54.8, name: "Draco 15" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [5, 13], [4, 14]]
    },

    'Pegasus': {
        description: 'The Winged Horse (Great Square)',
        stars: [
            { x: 76.2, y: 40.0, name: "Pegasus 1" },
            { x: 122.6, y: 57.7, name: "Pegasus 2" },
            { x: 151.7, y: 70.6, name: "Pegasus 3" },
            { x: 242.4, y: 64.5, name: "Pegasus 4" },
            { x: 249.2, y: 148.0, name: "Pegasus 5" },
            { x: 153.1, y: 147.8, name: "Pegasus 6" },
            { x: 127.7, y: 166.0, name: "Pegasus 7" },
            { x: 120.4, y: 174.1, name: "Pegasus 8" },
            { x: 76.5, y: 201.9, name: "Pegasus 9" },
            { x: 40.0, y: 179.8, name: "Pegasus 10" },
            { x: 132.4, y: 91.5, name: "Pegasus 11" },
            { x: 127.5, y: 97.7, name: "Pegasus 12" },
            { x: 72.0, y: 87.0, name: "Pegasus 13" },
            { x: 40.6, y: 85.2, name: "Pegasus 14" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [5, 2], [2, 10], [10, 11], [11, 12], [12, 13]]
    },

    'Andromeda': {
        description: 'The Chained Princess',
        stars: [
            { x: 255.0, y: 77.8, name: "Andromeda 1" },
            { x: 191.0, y: 118.0, name: "Andromeda 2" },
            { x: 155.1, y: 146.6, name: "Andromeda 3" },
            { x: 118.5, y: 157.2, name: "Andromeda 4" },
            { x: 176.2, y: 191.3, name: "Andromeda 5" },
            { x: 164.5, y: 186.2, name: "Andromeda 6" },
            { x: 154.1, y: 155.9, name: "Andromeda 7" },
            { x: 152.2, y: 129.5, name: "Andromeda 8" },
            { x: 82.8, y: 72.2, name: "Andromeda 9" },
            { x: 40.0, y: 77.8, name: "Andromeda 10" },
            { x: 85.5, y: 65.8, name: "Andromeda 11" },
            { x: 82.1, y: 53.0, name: "Andromeda 12" },
            { x: 175.6, y: 100.8, name: "Andromeda 13" },
            { x: 167.4, y: 85.3, name: "Andromeda 14" },
            { x: 190.7, y: 48.3, name: "Andromeda 15" },
            { x: 224.3, y: 40.0, name: "Andromeda 16" },
            { x: 92.1, y: 53.2, name: "Andromeda 17" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 2], [2, 7], [7, 8], [8, 9], [8, 10], [10, 11], [1, 12], [12, 13], [13, 14], [14, 15], [10, 16]]
    },

    'Ophiuchus': {
        description: 'The Serpent Bearer',
        stars: [
            { x: 195.0, y: 174.0, name: "Ophiuchus 1" },
            { x: 178.5, y: 99.1, name: "Ophiuchus 2" },
            { x: 172.0, y: 88.0, name: "Ophiuchus 3" },
            { x: 159.3, y: 40.0, name: "Ophiuchus 4" },
            { x: 104.2, y: 59.1, name: "Ophiuchus 5" },
            { x: 64.5, y: 103.5, name: "Ophiuchus 6" },
            { x: 40.0, y: 137.5, name: "Ophiuchus 7" },
            { x: 45.9, y: 143.5, name: "Ophiuchus 8" },
            { x: 73.8, y: 178.8, name: "Ophiuchus 9" },
            { x: 123.0, y: 209.7, name: "Ophiuchus 10" },
            { x: 64.9, y: 215.0, name: "Ophiuchus 11" },
            { x: 58.8, y: 226.1, name: "Ophiuchus 12" },
            { x: 54.4, y: 235.6, name: "Ophiuchus 13" },
            { x: 56.6, y: 256.0, name: "Ophiuchus 14" },
            { x: 140.2, y: 265.4, name: "Ophiuchus 15" },
            { x: 148.1, y: 294.6, name: "Ophiuchus 16" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [4, 8], [8, 10], [10, 11], [11, 12], [12, 13], [2, 9], [9, 14], [14, 15]]
    },

    'Leo': {
        description: 'The Lion',
        stars: [
            { x: 71.9, y: 124.2, name: "Leo 1" },
            { x: 70.4, y: 95.5, name: "Leo 2" },
            { x: 88.4, y: 77.0, name: "Leo 3" },
            { x: 165.1, y: 72.9, name: "Leo 4" },
            { x: 214.6, y: 108.6, name: "Leo 5" },
            { x: 165.3, y: 103.5, name: "Leo 6" },
            { x: 83.7, y: 55.5, name: "Leo 7" },
            { x: 49.8, y: 40.0, name: "Leo 8" },
            { x: 40.0, y: 53.4, name: "Leo 9" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 6], [6, 7], [7, 8]]
    },

    'Hydra': {
        description: 'The Water Snake (largest constellation)',
        stars: [
            { x: 53.5, y: 40.0, name: "Hydra 1" },
            { x: 55.9, y: 43.5, name: "Hydra 2" },
            { x: 48.2, y: 58.1, name: "Hydra 3" },
            { x: 41.6, y: 58.5, name: "Hydra 4" },
            { x: 40.0, y: 44.3, name: "Hydra 5" },
            { x: 66.2, y: 42.8, name: "Hydra 6" },
            { x: 94.2, y: 64.6, name: "Hydra 7" },
            { x: 131.9, y: 85.4, name: "Hydra 8" },
            { x: 113.8, y: 130.5, name: "Hydra 9" },
            { x: 149.0, y: 167.6, name: "Hydra 10" },
            { x: 177.3, y: 152.6, name: "Hydra 11" },
            { x: 200.2, y: 179.5, name: "Hydra 12" },
            { x: 234.9, y: 175.7, name: "Hydra 13" },
            { x: 299.0, y: 269.7, name: "Hydra 14" },
            { x: 328.4, y: 282.0, name: "Hydra 15" },
            { x: 455.4, y: 217.5, name: "Hydra 16" },
            { x: 525.5, y: 238.6, name: "Hydra 17" },
            { x: 590.4, y: 246.3, name: "Hydra 18" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17]]
    },

    'Cassiopeia': {
        description: 'The Queen (W-shape)',
        stars: [
            { x: 118.8, y: 40.0, name: "Cassiopeia 1" },
            { x: 97.4, y: 60.6, name: "Cassiopeia 2" },
            { x: 75.6, y: 57.7, name: "Cassiopeia 3" },
            { x: 63.5, y: 82.8, name: "Cassiopeia 4" },
            { x: 40.0, y: 67.1, name: "Cassiopeia 5" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
    },

    'Ursa Minor': {
        description: 'The Little Bear',
        stars: [
            { x: 54.4, y: 108.8, name: "Minor 1" },
            { x: 63.4, y: 121.1, name: "Minor 2" },
            { x: 48.1, y: 144.6, name: "Minor 3" },
            { x: 40.0, y: 130.7, name: "Minor 4" },
            { x: 71.1, y: 83.4, name: "Minor 5" },
            { x: 83.6, y: 56.1, name: "Minor 6" },
            { x: 229.3, y: 40.0, name: "Minor 7" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 5], [5, 6]]
    },

    'Cepheus': {
        description: 'The King',
        stars: [
            { x: 40.0, y: 127.8, name: "Cepheus 1" },
            { x: 50.5, y: 134.8, name: "Cepheus 2" },
            { x: 72.9, y: 130.3, name: "Cepheus 3" },
            { x: 89.6, y: 153.1, name: "Cepheus 4" },
            { x: 110.8, y: 163.5, name: "Cepheus 5" },
            { x: 108.0, y: 156.6, name: "Cepheus 6" },
            { x: 120.3, y: 155.3, name: "Cepheus 7" },
            { x: 134.0, y: 108.6, name: "Cepheus 8" },
            { x: 167.3, y: 40.0, name: "Cepheus 9" },
            { x: 79.6, y: 82.4, name: "Cepheus 10" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 2], [9, 7]]
    },

    'Perseus': {
        description: 'The Hero',
        stars: [
            { x: 168.3, y: 181.6, name: "Perseus 1" },
            { x: 178.8, y: 184.1, name: "Perseus 2" },
            { x: 183.9, y: 160.6, name: "Perseus 3" },
            { x: 182.7, y: 135.3, name: "Perseus 4" },
            { x: 169.2, y: 119.9, name: "Perseus 5" },
            { x: 166.8, y: 88.6, name: "Perseus 6" },
            { x: 160.0, y: 86.2, name: "Perseus 7" },
            { x: 147.0, y: 76.2, name: "Perseus 8" },
            { x: 126.3, y: 54.3, name: "Perseus 9" },
            { x: 111.3, y: 40.0, name: "Perseus 10" },
            { x: 115.1, y: 58.8, name: "Perseus 11" },
            { x: 130.8, y: 77.7, name: "Perseus 12" },
            { x: 131.3, y: 106.2, name: "Perseus 13" },
            { x: 129.9, y: 129.6, name: "Perseus 14" },
            { x: 133.2, y: 137.7, name: "Perseus 15" },
            { x: 126.7, y: 142.3, name: "Perseus 16" },
            { x: 119.9, y: 137.4, name: "Perseus 17" },
            { x: 120.8, y: 129.2, name: "Perseus 18" },
            { x: 192.0, y: 73.3, name: "Perseus 19" },
            { x: 200.8, y: 84.9, name: "Perseus 20" },
            { x: 194.2, y: 89.1, name: "Perseus 21" },
            { x: 104.4, y: 80.0, name: "Perseus 22" },
            { x: 40.0, y: 71.2, name: "Perseus 23" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 13], [18, 19], [19, 20], [20, 5], [11, 21], [21, 22]]
    },

    'Cygnus': {
        description: 'The Swan (Northern Cross)',
        stars: [
            { x: 172.4, y: 178.8, name: "Cygnus 1" },
            { x: 141.9, y: 156.4, name: "Cygnus 2" },
            { x: 114.5, y: 118.7, name: "Cygnus 3" },
            { x: 71.9, y: 89.4, name: "Cygnus 4" },
            { x: 54.4, y: 49.8, name: "Cygnus 5" },
            { x: 40.0, y: 40.0, name: "Cygnus 6" },
            { x: 136.4, y: 88.5, name: "Cygnus 7" },
            { x: 84.8, y: 149.7, name: "Cygnus 8" },
            { x: 55.6, y: 192.5, name: "Cygnus 9" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [6, 2], [2, 7], [7, 8]]
    },

    'Lyra': {
        description: 'The Harp',
        stars: [
            { x: 49.4, y: 52.0, name: "Lyra 1" },
            { x: 49.0, y: 40.0, name: "Lyra 2" },
            { x: 40.0, y: 45.0, name: "Lyra 3" },
            { x: 61.2, y: 56.3, name: "Lyra 4" },
            { x: 66.5, y: 81.5, name: "Lyra 5" },
            { x: 55.8, y: 77.5, name: "Lyra 6" },
        ],
        lines: [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4], [4, 5], [5, 0]]
    },

    'Aquila': {
        description: 'The Eagle',
        stars: [
            { x: 101.1, y: 59.5, name: "Aquila 1" },
            { x: 107.8, y: 70.0, name: "Aquila 2" },
            { x: 114.6, y: 84.7, name: "Aquila 3" },
            { x: 138.5, y: 128.1, name: "Aquila 4" },
            { x: 110.3, y: 117.1, name: "Aquila 5" },
            { x: 70.0, y: 104.5, name: "Aquila 6" },
            { x: 40.0, y: 40.0, name: "Aquila 7" },
            { x: 41.3, y: 152.5, name: "Aquila 8" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1], [1, 5], [5, 7]]
    },

    'Scorpius': {
        description: 'The Scorpion',
        stars: [
            { x: 40.0, y: 77.9, name: "Scorpius 1" },
            { x: 41.9, y: 56.9, name: "Scorpius 2" },
            { x: 48.3, y: 40.0, name: "Scorpius 3" },
            { x: 68.0, y: 74.7, name: "Scorpius 4" },
            { x: 78.3, y: 79.8, name: "Scorpius 5" },
            { x: 86.4, y: 90.5, name: "Scorpius 6" },
            { x: 104.3, y: 126.9, name: "Scorpius 7" },
            { x: 106.5, y: 149.5, name: "Scorpius 8" },
            { x: 109.9, y: 175.3, name: "Scorpius 9" },
            { x: 131.9, y: 180.6, name: "Scorpius 10" },
            { x: 163.5, y: 179.2, name: "Scorpius 11" },
            { x: 176.3, y: 161.9, name: "Scorpius 12" },
            { x: 170.0, y: 155.3, name: "Scorpius 13" },
            { x: 158.8, y: 143.8, name: "Scorpius 14" },
        ],
        lines: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13]]
    },

    'Sagittarius': {
        description: 'The Archer (Teapot)',
        stars: [
            { x: 55.7, y: 164.8, name: "Sagittarius 1" },
            { x: 64.4, y: 150.6, name: "Sagittarius 2" },
            { x: 60.2, y: 123.2, name: "Sagittarius 3" },
            { x: 69.4, y: 96.8, name: "Sagittarius 4" },
            { x: 50.6, y: 70.6, name: "Sagittarius 5" },
            { x: 142.1, y: 211.0, name: "Sagittarius 6" },
            { x: 143.7, y: 188.0, name: "Sagittarius 7" },
            { x: 115.5, y: 123.6, name: "Sagittarius 8" },
            { x: 92.9, y: 106.2, name: "Sagittarius 9" },
            { x: 185.4, y: 195.5, name: "Sagittarius 10" },
            { x: 191.4, y: 155.9, name: "Sagittarius 11" },
            { x: 186.2, y: 102.1, name: "Sagittarius 12" },
            { x: 160.8, y: 93.6, name: "Sagittarius 13" },
            { x: 145.6, y: 91.3, name: "Sagittarius 14" },
            { x: 132.7, y: 95.8, name: "Sagittarius 15" },
            { x: 105.7, y: 102.1, name: "Sagittarius 16" },
            { x: 40.0, y: 126.8, name: "Sagittarius 17" },
            { x: 121.2, y: 110.3, name: "Sagittarius 18" },
            { x: 118.2, y: 74.7, name: "Sagittarius 19" },
            { x: 125.0, y: 70.4, name: "Sagittarius 20" },
            { x: 135.4, y: 58.0, name: "Sagittarius 21" },
            { x: 140.8, y: 51.4, name: "Sagittarius 22" },
            { x: 140.9, y: 40.0, name: "Sagittarius 23" },
            { x: 109.0, y: 70.9, name: "Sagittarius 24" },
            { x: 104.3, y: 80.7, name: "Sagittarius 25" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 3], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 8], [8, 2], [2, 16], [16, 1], [1, 7], [7, 17], [17, 15], [15, 18], [18, 19], [19, 20], [20, 21], [21, 22], [18, 23], [23, 24], [24, 15]]
    },

    'Gemini': {
        description: 'The Twins',
        stars: [
            { x: 40.0, y: 96.3, name: "Gemini 1" },
            { x: 51.2, y: 96.2, name: "Gemini 2" },
            { x: 80.1, y: 80.5, name: "Gemini 3" },
            { x: 117.7, y: 49.9, name: "Gemini 4" },
            { x: 150.1, y: 40.0, name: "Gemini 5" },
            { x: 164.9, y: 63.2, name: "Gemini 6" },
            { x: 151.9, y: 70.0, name: "Gemini 7" },
            { x: 130.1, y: 99.4, name: "Gemini 8" },
            { x: 108.0, y: 107.9, name: "Gemini 9" },
            { x: 71.5, y: 132.9, name: "Gemini 10" },
            { x: 82.0, y: 154.0, name: "Gemini 11" },
            { x: 127.3, y: 132.1, name: "Gemini 12" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [7, 11]]
    },

    'Taurus': {
        description: 'The Bull',
        stars: [
            { x: 233.0, y: 84.8, name: "Taurus 1" },
            { x: 143.3, y: 112.6, name: "Taurus 2" },
            { x: 132.8, y: 116.4, name: "Taurus 3" },
            { x: 119.9, y: 117.9, name: "Taurus 4" },
            { x: 124.5, y: 106.4, name: "Taurus 5" },
            { x: 132.7, y: 96.6, name: "Taurus 6" },
            { x: 216.5, y: 40.0, name: "Taurus 7" },
            { x: 92.1, y: 136.7, name: "Taurus 8" },
            { x: 43.4, y: 153.2, name: "Taurus 9" },
            { x: 95.7, y: 175.7, name: "Taurus 10" },
            { x: 40.0, y: 157.5, name: "Taurus 11" },
            { x: 57.5, y: 209.2, name: "Taurus 12" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 7], [7, 8], [8, 9], [8, 10], [10, 11]]
    },

    'Canis Major': {
        description: 'The Great Dog',
        stars: [
            { x: 43.3, y: 75.5, name: "Major 1" },
            { x: 74.5, y: 68.1, name: "Major 2" },
            { x: 99.3, y: 110.8, name: "Major 3" },
            { x: 106.7, y: 126.1, name: "Major 4" },
            { x: 97.4, y: 135.4, name: "Major 5" },
            { x: 93.2, y: 141.6, name: "Major 6" },
            { x: 40.0, y: 148.1, name: "Major 7" },
            { x: 128.5, y: 143.6, name: "Major 8" },
            { x: 89.7, y: 70.1, name: "Major 9" },
            { x: 100.3, y: 61.6, name: "Major 10" },
            { x: 87.0, y: 40.0, name: "Major 11" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [7, 3], [1, 8], [8, 9], [9, 10], [10, 8]]
    },

    'Auriga': {
        description: 'The Charioteer',
        stars: [
            { x: 110.6, y: 96.0, name: "Auriga 1" },
            { x: 62.2, y: 89.7, name: "Auriga 2" },
            { x: 50.8, y: 118.3, name: "Auriga 3" },
            { x: 40.0, y: 166.7, name: "Auriga 4" },
            { x: 73.1, y: 194.1, name: "Auriga 5" },
            { x: 110.8, y: 142.4, name: "Auriga 6" },
            { x: 110.6, y: 40.0, name: "Auriga 7" },
            { x: 45.6, y: 102.8, name: "Auriga 8" },
            { x: 46.2, y: 119.3, name: "Auriga 9" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [6, 1], [1, 7], [7, 8]]
    },

    'Boötes': {
        description: 'The Herdsman (Kite)',
        stars: [
            { x: 40.0, y: 246.4, name: "Boötes 1" },
            { x: 49.4, y: 240.7, name: "Boötes 2" },
            { x: 76.0, y: 236.0, name: "Boötes 3" },
            { x: 96.5, y: 168.9, name: "Boötes 4" },
            { x: 96.8, y: 121.3, name: "Boötes 5" },
            { x: 134.7, y: 108.8, name: "Boötes 6" },
            { x: 151.8, y: 151.2, name: "Boötes 7" },
            { x: 113.2, y: 188.7, name: "Boötes 8" },
            { x: 108.3, y: 268.7, name: "Boötes 9" },
            { x: 76.9, y: 74.6, name: "Boötes 10" },
            { x: 73.2, y: 40.4, name: "Boötes 11" },
            { x: 88.1, y: 40.0, name: "Boötes 12" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 2], [2, 8], [4, 9], [9, 10], [10, 11], [11, 9]]
    },

    'Hercules': {
        description: 'The Hero (Keystone)',
        stars: [
            { x: 77.0, y: 203.0, name: "Hercules 1" },
            { x: 87.4, y: 188.9, name: "Hercules 2" },
            { x: 101.4, y: 128.3, name: "Hercules 3" },
            { x: 103.5, y: 84.3, name: "Hercules 4" },
            { x: 92.3, y: 63.3, name: "Hercules 5" },
            { x: 74.2, y: 40.0, name: "Hercules 6" },
            { x: 60.3, y: 48.3, name: "Hercules 7" },
            { x: 40.0, y: 63.2, name: "Hercules 8" },
            { x: 125.4, y: 132.3, name: "Hercules 9" },
            { x: 144.1, y: 97.0, name: "Hercules 10" },
            { x: 196.1, y: 94.4, name: "Hercules 11" },
            { x: 155.0, y: 95.0, name: "Hercules 12" },
            { x: 144.1, y: 168.8, name: "Hercules 13" },
            { x: 183.8, y: 151.6, name: "Hercules 14" },
            { x: 198.1, y: 142.4, name: "Hercules 15" },
            { x: 210.4, y: 145.3, name: "Hercules 16" },
            { x: 143.6, y: 231.5, name: "Hercules 17" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [2, 8], [3, 9], [10, 11], [11, 9], [9, 8], [8, 12], [12, 13], [13, 14], [14, 15], [16, 1]]
    },

    'Corona Borealis': {
        description: 'The Northern Crown',
        stars: [
            { x: 46.8, y: 40.0, name: "Borealis 1" },
            { x: 40.0, y: 53.5, name: "Borealis 2" },
            { x: 49.1, y: 67.9, name: "Borealis 3" },
            { x: 59.7, y: 70.4, name: "Borealis 4" },
            { x: 68.8, y: 71.7, name: "Borealis 5" },
            { x: 79.4, y: 66.9, name: "Borealis 6" },
            { x: 84.5, y: 49.0, name: "Borealis 7" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
    },

    'Virgo': {
        description: 'The Virgin',
        stars: [
            { x: 40.0, y: 66.6, name: "Virgo 1" },
            { x: 47.3, y: 95.2, name: "Virgo 2" },
            { x: 91.1, y: 109.8, name: "Virgo 3" },
            { x: 123.7, y: 114.5, name: "Virgo 4" },
            { x: 166.1, y: 139.0, name: "Virgo 5" },
            { x: 189.0, y: 172.7, name: "Virgo 6" },
            { x: 265.2, y: 141.8, name: "Virgo 7" },
            { x: 305.8, y: 139.7, name: "Virgo 8" },
            { x: 154.5, y: 40.0, name: "Virgo 9" },
            { x: 144.6, y: 85.4, name: "Virgo 10" },
            { x: 203.2, y: 109.3, name: "Virgo 11" },
            { x: 243.7, y: 96.5, name: "Virgo 12" },
            { x: 310.6, y: 94.4, name: "Virgo 13" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [8, 9], [9, 3], [4, 10], [10, 11], [11, 12]]
    },

    'Canis Minor': {
        description: 'The Small Dog',
        stars: [
            { x: 58.1, y: 58.4, name: "Minor 1" },
            { x: 40.0, y: 40.0, name: "Minor 2" },
        ],
        lines: [[0, 1]]
    },

    'Cancer': {
        description: 'The Crab',
        stars: [
            { x: 99.9, y: 141.4, name: "Cancer 1" },
            { x: 80.2, y: 103.7, name: "Cancer 2" },
            { x: 78.2, y: 83.8, name: "Cancer 3" },
            { x: 83.0, y: 40.0, name: "Cancer 4" },
            { x: 40.0, y: 157.5, name: "Cancer 5" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [1, 4]]
    },

    'Aquarius': {
        description: 'The Water Bearer',
        stars: [
            { x: 40.0, y: 105.2, name: "Aquarius 1" },
            { x: 47.4, y: 102.2, name: "Aquarius 2" },
            { x: 105.2, y: 81.7, name: "Aquarius 3" },
            { x: 156.0, y: 50.2, name: "Aquarius 4" },
            { x: 179.6, y: 56.6, name: "Aquarius 5" },
            { x: 190.2, y: 48.4, name: "Aquarius 6" },
            { x: 199.9, y: 49.0, name: "Aquarius 7" },
            { x: 225.5, y: 93.7, name: "Aquarius 8" },
            { x: 263.1, y: 103.4, name: "Aquarius 9" },
            { x: 250.5, y: 175.3, name: "Aquarius 10" },
            { x: 157.0, y: 131.5, name: "Aquarius 11" },
            { x: 172.4, y: 95.0, name: "Aquarius 12" },
            { x: 184.9, y: 40.0, name: "Aquarius 13" },
            { x: 270.6, y: 168.9, name: "Aquarius 14" },
            { x: 298.5, y: 155.2, name: "Aquarius 15" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [2, 10], [3, 11], [5, 12], [13, 8], [8, 14]]
    },

    'Capricornus': {
        description: 'The Sea-Goat',
        stars: [
            { x: 40.0, y: 40.0, name: "Capricornus 1" },
            { x: 44.8, y: 53.6, name: "Capricornus 2" },
            { x: 55.9, y: 71.8, name: "Capricornus 3" },
            { x: 80.4, y: 116.6, name: "Capricornus 4" },
            { x: 88.6, y: 126.5, name: "Capricornus 5" },
            { x: 138.1, y: 99.4, name: "Capricornus 6" },
            { x: 167.0, y: 61.7, name: "Capricornus 7" },
            { x: 157.2, y: 64.9, name: "Capricornus 8" },
            { x: 131.8, y: 66.0, name: "Capricornus 9" },
            { x: 108.6, y: 68.3, name: "Capricornus 10" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0]]
    },

    'Libra': {
        description: 'The Scales',
        stars: [
            { x: 58.5, y: 135.4, name: "Libra 1" },
            { x: 40.0, y: 80.0, name: "Libra 2" },
            { x: 76.7, y: 40.0, name: "Libra 3" },
            { x: 102.7, y: 72.4, name: "Libra 4" },
            { x: 104.8, y: 152.5, name: "Libra 5" },
            { x: 107.1, y: 162.4, name: "Libra 6" },
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 3]]
    },

    'Aries': {
        description: 'The Ram',
        stars: [
            { x: 118.1, y: 40.0, name: "Aries 1" },
            { x: 58.9, y: 62.8, name: "Aries 2" },
            { x: 41.5, y: 78.7, name: "Aries 3" },
            { x: 40.0, y: 87.8, name: "Aries 4" },
        ],
        lines: [[0, 1], [1, 2], [2, 3]]
    },

    'Pisces': {
        description: 'The Fishes',
        stars: [
            { x: 232.2, y: 73.0, name: "Pisces 1" },
            { x: 229.1, y: 40.0, name: "Pisces 2" },
            { x: 240.7, y: 57.0, name: "Pisces 3" },
            { x: 228.8, y: 94.3, name: "Pisces 4" },
            { x: 258.5, y: 128.5, name: "Pisces 5" },
            { x: 279.0, y: 165.6, name: "Pisces 6" },
            { x: 303.7, y: 204.0, name: "Pisces 7" },
            { x: 291.1, y: 201.4, name: "Pisces 8" },
            { x: 273.2, y: 187.6, name: "Pisces 9" },
            { x: 256.5, y: 183.7, name: "Pisces 10" },
            { x: 232.2, y: 175.1, name: "Pisces 11" },
            { x: 216.2, y: 173.2, name: "Pisces 12" },
            { x: 195.1, y: 175.0, name: "Pisces 13" },
            { x: 122.0, y: 179.4, name: "Pisces 14" },
            { x: 93.4, y: 186.8, name: "Pisces 15" },
            { x: 75.7, y: 182.3, name: "Pisces 16" },
            { x: 64.4, y: 188.2, name: "Pisces 17" },
            { x: 59.7, y: 200.8, name: "Pisces 18" },
            { x: 74.1, y: 213.0, name: "Pisces 19" },
            { x: 96.5, y: 209.9, name: "Pisces 20" },
            { x: 102.9, y: 199.6, name: "Pisces 21" },
            { x: 40.0, y: 197.6, name: "Pisces 22" },
        ],
        lines: [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 14], [17, 21]]
    },
};

// Navigation links
const NAV_LINKS = [
    { link: "about.html", label: "About Me" },
    { link: "projects.html", label: "Projects" },
    { link: "assets/cv.pdf", label: "CV" },
    { link: "#", label: "Contact" },
    { link: "https://www.linkedin.com/in/aarya-ray/", label: "LinkedIn" },
    { link: "https://www.kaggle.com/aaryaraychaudhuri", label: "Kaggle" },
    { link: "https://github.com/aaryaray1", label: "GitHub" }
];

// Build multiple random "constellations" from the navigation links
// Each pattern uses the same stars count but different connection styles
const CONSTELLATIONS = (() => {
    const svgWidth = 800;
    const svgHeight = 600;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2 - 40; // keep away from bottom edge
    const baseRadius = Math.min(svgWidth, svgHeight) / 3;

    const count = NAV_LINKS.length;

    function buildStars() {
        const angleStep = (2 * Math.PI) / count;
        return NAV_LINKS.map((nav, idx) => {
            const angle = idx * angleStep + (Math.random() - 0.5) * 0.3; // small random offset
            const r = baseRadius + (Math.random() - 0.5) * 40; // slight radial jitter

            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            return {
                x,
                y,
                name: nav.label,
                link: nav.link,
                label: nav.label
            };
        });
    }

    function buildLoopConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        if (count > 2) {
            connections.push([count - 1, 0]);
        }
        return connections;
    }

    function buildLineConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        return connections;
    }

    function buildStarConnections() {
        const connections = [];
        for (let i = 1; i < count; i++) {
            connections.push([0, i]);
        }
        return connections;
    }

    function buildCrissCrossConnections() {
        const connections = [];
        for (let i = 0; i < count; i++) {
            const j = (i + Math.floor(count / 2)) % count;
            if (i !== j) {
                connections.push([i, j]);
            }
        }
        return connections;
    }

    function buildRandomConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        // add a few random extra chords
        for (let k = 0; k < Math.max(1, Math.floor(count / 3)); k++) {
            const a = Math.floor(Math.random() * count);
            let b = Math.floor(Math.random() * count);
            if (a === b) {
                b = (b + 1) % count;
            }
            connections.push([a, b]);
        }
        return connections;
    }

    function buildClusterConnections() {
        const connections = [];
        const mid = Math.floor(count / 2);
        // first half as a tight cluster
        for (let i = 0; i < mid - 1; i++) {
            connections.push([i, i + 1]);
        }
        // second half as another cluster
        for (let i = mid; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        // a bridge between clusters
        if (count > 3) {
            connections.push([0, mid]);
        }
        return connections;
    }

    function buildSpiralConnections() {
        const connections = [];
        for (let i = 0; i < count - 2; i++) {
            connections.push([i, i + 2]);
        }
        return connections;
    }

    function buildWebConnections() {
        const connections = [];
        for (let i = 0; i < count; i++) {
            connections.push([i, (i + 1) % count]);
            connections.push([i, (i + 2) % count]);
        }
        return connections;
    }

    // Letter / "wacky" inspired shapes
    function buildWShapeConnections() {
        const idx = (i) => ((i % count) + count) % count;
        const order = [0, 2, 1, 3, 2, 4].map(idx);
        const connections = [];
        for (let i = 0; i < order.length - 1; i++) {
            connections.push([order[i], order[i + 1]]);
        }
        return connections;
    }

    function buildMShapeConnections() {
        const idx = (i) => ((i % count) + count) % count;
        const order = [0, 3, 1, 4].map(idx);
        const connections = [];
        for (let i = 0; i < order.length - 1; i++) {
            connections.push([order[i], order[i + 1]]);
        }
        return connections;
    }

    function buildZigZagConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
            if (i + 2 < count) {
                connections.push([i, i + 2]);
            }
        }
        return connections;
    }

    function buildArcConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        for (let i = 0; i < count - 2; i++) {
            connections.push([i, i + 2]);
        }
        return connections;
    }

    const patterns = [];

    patterns.push({
        name: 'Loop Pattern',
        description: '',
        stars: buildStars(),
        connections: buildLoopConnections()
    });

    patterns.push({
        name: 'Line Pattern',
        description: '',
        stars: buildStars(),
        connections: buildLineConnections()
    });

    patterns.push({
        name: 'Star Pattern',
        description: '',
        stars: buildStars(),
        connections: buildStarConnections()
    });

    patterns.push({
        name: 'Criss-Cross Pattern',
        description: '',
        stars: buildStars(),
        connections: buildCrissCrossConnections()
    });

    patterns.push({
        name: 'Random Graph Pattern',
        description: '',
        stars: buildStars(),
        connections: buildRandomConnections()
    });

    patterns.push({
        name: 'Cluster Pattern',
        description: '',
        stars: buildStars(),
        connections: buildClusterConnections()
    });

    patterns.push({
        name: 'Spiral Pattern',
        description: '',
        stars: buildStars(),
        connections: buildSpiralConnections()
    });

    patterns.push({
        name: 'Web Pattern',
        description: '',
        stars: buildStars(),
        connections: buildWebConnections()
    });

    // Extra rich patterns for more visual variety
    patterns.push({
        name: 'Radiant Web',
        description: '',
        stars: buildStars(),
        connections: [
            ...buildWebConnections(),
            ...buildStarConnections()
        ]
    });

    patterns.push({
        name: 'Halo Circuit',
        description: '',
        stars: buildStars(),
        connections: [
            ...buildLoopConnections(),
            ...buildRandomConnections()
        ]
    });

    patterns.push({
        name: 'Twin Clusters',
        description: '',
        stars: buildStars(),
        connections: [
            ...buildClusterConnections(),
            ...buildWebConnections()
        ]
    });

    patterns.push({
        name: 'Spiral Weave',
        description: '',
        stars: buildStars(),
        connections: [
            ...buildSpiralConnections(),
            ...buildRandomConnections()
        ]
    });

    patterns.push({
        name: 'Crown Pattern',
        description: '',
        stars: buildStars(),
        connections: [
            ...buildStarConnections(),
            ...buildLoopConnections()
        ]
    });

    patterns.push({
        name: 'W Shape',
        description: '',
        stars: buildStars(),
        connections: buildWShapeConnections()
    });

    patterns.push({
        name: 'M Shape',
        description: '',
        stars: buildStars(),
        connections: buildMShapeConnections()
    });

    patterns.push({
        name: 'Zig-Zag',
        description: '',
        stars: buildStars(),
        connections: buildZigZagConnections()
    });

    patterns.push({
        name: 'Arc Web',
        description: '',
        stars: buildStars(),
        connections: buildArcConnections()
    });

    return patterns;
})();

/**
 * Pick a random REAL constellation from CONSTELLATION_DATA and map an arbitrary
 * list of "items" (nav links, project cards, etc.) onto its star positions.
 *
 * So: geometry + name come from a real night-sky constellation, the content
 * (labels/links/click targets) comes from whatever `items` array is passed in.
 *
 * @param {Array<{label: string, [key: string]: any}>} items - things to place on stars
 * @param {Object} [opts]
 * @param {string[]} [opts.priorityLabels] - preferred order when items must be trimmed
 * @returns {{name: string, description: string, stars: Array, connections: Array}}
 */
/**
 * Choose `count` stars that are spread across the figure, so the captions they
 * carry have room to breathe.
 *
 * Farthest-point sampling: start from the star furthest from the centre (a
 * limb tip, which reads well), then repeatedly take whichever remaining star is
 * furthest from everything already chosen. The result is returned in reading
 * order - top to bottom, then left to right - so the items land in a sensible
 * sequence rather than a scattered one.
 */
function pickSpreadIndices(stars, count) {
    const total = stars.length;
    if (count >= total) return stars.map((star, index) => index);
    if (count <= 0) return [];

    const cx = stars.reduce((sum, star) => sum + star.x, 0) / total;
    const cy = stars.reduce((sum, star) => sum + star.y, 0) / total;

    let seed = 0;
    let seedDist = -1;
    stars.forEach((star, index) => {
        const d = Math.hypot(star.x - cx, star.y - cy);
        if (d > seedDist) {
            seedDist = d;
            seed = index;
        }
    });

    const chosen = [seed];
    const best = stars.map((star) => Math.hypot(star.x - stars[seed].x, star.y - stars[seed].y));
    best[seed] = -1;

    while (chosen.length < count) {
        let pick = -1;
        let pickDist = -1;
        for (let i = 0; i < total; i++) {
            if (best[i] > pickDist) {
                pickDist = best[i];
                pick = i;
            }
        }
        if (pick < 0) break;

        chosen.push(pick);
        best[pick] = -1;
        for (let i = 0; i < total; i++) {
            if (best[i] < 0) continue;
            const d = Math.hypot(stars[i].x - stars[pick].x, stars[i].y - stars[pick].y);
            if (d < best[i]) best[i] = d;
        }
    }

    // Reading order, so item 1 is not at the bottom of the figure.
    return chosen.sort((a, b) => (stars[a].y - stars[b].y) || (stars[a].x - stars[b].x));
}

function pickConstellationForItems(items, opts = {}) {
    const names = Object.keys(CONSTELLATION_DATA);
    const itemCount = items.length;

    // If we somehow have no real data, fall back to the old procedural patterns.
    if (!names.length) {
        const fallbackIndex = Math.floor(Math.random() * CONSTELLATIONS.length);
        return CONSTELLATIONS[fallbackIndex];
    }

    // Prefer constellations with at least as many stars as we have items,
    // so every item gets its own point and no shape has to be truncated.
    const eligibleNames = names.filter((name) => {
        const starCount = (CONSTELLATION_DATA[name].stars || []).length;
        return starCount >= itemCount;
    });

    // Nothing big enough exists (item list longer than any real constellation
    // we know) - fall back to whichever constellation(s) have the most stars,
    // so we lose as little of the shape/content as possible.
    let chosenPool = eligibleNames;
    if (!chosenPool.length) {
        const maxStars = Math.max(
            ...names.map((name) => (CONSTELLATION_DATA[name].stars || []).length)
        );
        chosenPool = names.filter(
            (name) => (CONSTELLATION_DATA[name].stars || []).length === maxStars
        );
    }

    // With several items to place, steer away from extremely elongated real
    // shapes (e.g. Draco's long thin tail) - they leave little room for
    // labels once stretched across a wide/short area. Only applies when a
    // roomier alternative actually exists.
    if (chosenPool.length > 1 && itemCount >= 7) {
        const roomy = chosenPool.filter((name) => {
            const stars = CONSTELLATION_DATA[name].stars || [];
            const xs = stars.map((s) => s.x);
            const ys = stars.map((s) => s.y);
            const w = Math.max(...xs) - Math.min(...xs) || 1;
            const h = Math.max(...ys) - Math.min(...ys) || 1;
            return Math.max(w, h) / Math.min(w, h) <= 3.5;
        });
        if (roomy.length) chosenPool = roomy;
    }

    const randomName = chosenPool[Math.floor(Math.random() * chosenPool.length)];
    const data = CONSTELLATION_DATA[randomName];

    const baseStars = data.stars || [];
    const baseCount = baseStars.length || 1;

    // Helper: when the constellation has fewer stars than items, select a
    // prioritized subset of items rather than dropping them off the end.
    function getPrioritizedItems(maxCount) {
        const preferredOrder = opts.priorityLabels || [];
        const selected = [];

        for (const label of preferredOrder) {
            const match = items.find((item) => item.label === label);
            if (match && !selected.includes(match)) {
                selected.push(match);
                if (selected.length >= maxCount) return selected;
            }
        }

        for (const item of items) {
            if (!selected.includes(item)) {
                selected.push(item);
                if (selected.length >= maxCount) break;
            }
        }

        return selected;
    }

    const itemsForThisConstellation =
        baseCount >= itemCount ? items : getPrioritizedItems(baseCount);

    // Always render the constellation's full real star pattern - the same
    // name always looks like the same shape, whether it's carrying 7 nav
    // links or 9 projects. Stars left over still render as small unlabelled
    // points so the outline stays complete instead of getting cut short.
    //
    // Which stars carry the items is chosen for spread rather than array
    // order: the star list often runs along one limb of the figure, and
    // labelling a tight run of neighbours leaves the captions fighting for the
    // same patch of sky. This changes nothing about the shape itself - every
    // star and every line still renders exactly where the chart puts it.
    const carriers = pickSpreadIndices(baseStars, itemsForThisConstellation.length);
    const itemForStar = new Map();
    carriers.forEach((starIndex, n) => itemForStar.set(starIndex, itemsForThisConstellation[n]));

    const stars = baseStars.map((template, index) => {
        const item = itemForStar.get(index);
        if (item) {
            return {
                ...item,
                x: template.x,
                y: template.y,
                name: item.label,
                label: item.label,
                decorative: false
            };
        }
        return {
            x: template.x,
            y: template.y,
            name: template.name || '',
            label: '',
            decorative: true
        };
    });

    // Every real connection renders - the full outline always shows.
    const connections = (data.lines || []).map(([a, b]) => [a, b]);

    return {
        name: randomName,
        description: data.description || '',
        stars,
        connections
    };
}

/**
 * Get a random real constellation using the site's nav links (About, Projects,
 * LinkedIn, GitHub, Kaggle, Contact, CV) as the stars. Used on the home page.
 */
function getRandomConstellation() {
    return pickConstellationForItems(NAV_LINKS, {
        priorityLabels: ['About Me', 'Projects', 'LinkedIn', 'GitHub', 'Kaggle']
    });
}

/**
 * Friendly, human-readable line describing a chosen constellation, e.g.
 * "Orion — The Hunter". Falls back gracefully if no description exists.
 */
function describeConstellation(constellation) {
    if (!constellation || !constellation.name) return '';
    return constellation.description
        ? `${constellation.name} — ${constellation.description}`
        : constellation.name;
}

/* Sizes the constellation wants to end up at ON SCREEN, in CSS pixels.
   The SVG is scaled to fit its container, so these get converted into viewBox
   units at render time (see `metricsFor`). Keeping them in screen pixels is
   what makes a star the same size on the home page and the projects page,
   whatever height each container happens to be. */
const STAR_RADIUS_PX = 9;      // the visible star
const STAR_HIT_RADIUS_PX = 22; // the (invisible) pointer target
const DECOR_RADIUS_PX = 4;     // stars that only complete the outline
const LABEL_SIZE_PX = 15;
const LABEL_GAP_ABOVE_PX = 24;
const LABEL_GAP_BELOW_PX = 30;
const LABEL_GAP_SIDE_PX = 16;   // clearance when a caption sits beside a star
const STAR_HALO_PX = 6;         // the glow around a star, which text must clear

/* Half the average glyph advance, in em. Measured against rendered IBM Plex
   Sans rather than guessed: at 0.29 the estimate came out ~13% narrow, and
   captions got placed into gaps they did not actually fit. */
const GLYPH_HALF_EM = 0.33;
const EDGE_PADDING_PX = 10;    // breathing room at the canvas edge

/**
 * Work out the viewBox to draw into, and every metric in viewBox units, from
 * the size the SVG actually occupies on screen.
 *
 * The viewBox is given the container's own aspect ratio so the shape fills the
 * space instead of being letterboxed inside a fixed 800x600 box - which is what
 * used to leave the constellation tiny in the middle of a wide container.
 */
function metricsFor(svg) {
    const box = svg.getBoundingClientRect();
    const boxW = box.width || 800;
    const boxH = box.height || 600;

    const vbHeight = 600;
    // viewBox units per screen pixel
    const unit = vbHeight / boxH;
    // The viewBox must keep the container's exact aspect ratio, otherwise
    // preserveAspectRatio letterboxes the drawing and every metric below comes
    // out at the wrong scale. No clamping here for that reason - a very wide or
    // very tall box just gets a very wide or very tall viewBox.
    const vbWidth = Math.round(vbHeight * (boxW / boxH));

    const labelSize = LABEL_SIZE_PX * unit;

    return {
        vbWidth,
        vbHeight,
        starRadius: STAR_RADIUS_PX * unit,
        hitRadius: STAR_HIT_RADIUS_PX * unit,
        decorRadius: DECOR_RADIUS_PX * unit,
        labelSize,
        labelCharHalf: labelSize * GLYPH_HALF_EM,
        labelGapAbove: LABEL_GAP_ABOVE_PX * unit,
        labelGapBelow: LABEL_GAP_BELOW_PX * unit,
        labelGapSide: LABEL_GAP_SIDE_PX * unit,
        starHalo: STAR_HALO_PX * unit,
        edgePadding: EDGE_PADDING_PX * unit
    };
}

/**
 * Shorten a star's on-screen caption at a word boundary where possible, so
 * long project names ("Good Times Music Blog") don't run into neighboring
 * stars. The full label is still used for the click target / project modal.
 */
function truncateLabel(text, maxChars = 18) {
    if (!text || text.length <= maxChars) return text;
    const cut = text.slice(0, maxChars);
    const lastSpace = cut.lastIndexOf(' ');
    const trimmed = lastSpace > maxChars * 0.5 ? cut.slice(0, lastSpace) : cut;
    return `${trimmed.trimEnd()}…`;
}

/* Caption positions tried around a star, as unit directions. Below and above
   come first (they read best), then the sides, then the diagonals. */
const LABEL_SIDES = [
    { dx: 0, dy: 1, anchor: 'middle' },
    { dx: 0, dy: -1, anchor: 'middle' },
    { dx: 1, dy: 0, anchor: 'start' },
    { dx: -1, dy: 0, anchor: 'end' },
    { dx: 1, dy: 1, anchor: 'start' },
    { dx: -1, dy: 1, anchor: 'end' },
    { dx: 1, dy: -1, anchor: 'start' },
    { dx: -1, dy: -1, anchor: 'end' },
    { dx: 0.55, dy: 1, anchor: 'start' },
    { dx: -0.55, dy: 1, anchor: 'end' },
    { dx: 0.55, dy: -1, anchor: 'start' },
    { dx: -0.55, dy: -1, anchor: 'end' }
];

/* Distances at which a caption is tried, as multiples of the base gap. */
const LABEL_RINGS = [1, 1.5, 2.1];

/* What each kind of collision costs a candidate position. Anything at or above
   COST_CONFLICT means the caption could not be placed acceptably. */
const COST_OFF_CANVAS = 1000;
const COST_OVER_LABEL = 150;
const COST_OVER_STAR = 150;
const COST_OVER_DIM_STAR = 12;
const COST_CONFLICT = 100;

function boxesOverlap(a, b, pad) {
    return !(a.right + pad < b.left || b.right + pad < a.left ||
             a.bottom + pad < b.top || b.bottom + pad < a.top);
}

/**
 * Choose where each caption sits, given stars whose positions are fixed.
 *
 * The stars ARE the real constellation and must not move, so the captions do
 * all the accommodating: each tries a ring of candidate positions around its
 * star and takes the first that collides with nothing. Candidates are ordered
 * by how empty that side of the star is, so captions radiate away from a
 * cluster rather than piling into it.
 *
 * @returns {{placements: Array, conflicts: number}} placements are indexed to
 *   match `stars` (null where a star carries no caption); `conflicts` counts
 *   the captions that could not be placed cleanly.
 */
function placeLabels(m, stars, svgWidth, svgHeight, labelChars) {
    const placements = new Array(stars.length).fill(null);
    const placed = [];
    let conflicts = 0;
    const pad = m.labelSize * 0.18;
    const edge = m.labelSize * 0.4;

    // Star discs are obstacles too, and so is the glow around them - text that
    // lands inside a star's halo reads as sitting on the star even when the
    // geometry says it clears. Every star counts here, including the caption's
    // own: a label should sit beside its star, not on it.
    const starBoxes = stars.map((star) => {
        const dim = star.decorative || !star.label;
        const r = (dim ? m.decorRadius : m.starRadius) + (dim ? 0 : m.starHalo) + pad;
        return {
            left: star.tx - r, right: star.tx + r, top: star.ty - r, bottom: star.ty + r,
            // Text across a bright, glowing star is the worst thing that can
            // happen to a caption. Text clipping a small dim point is barely
            // noticeable - real star charts do it constantly - so it costs
            // little and never forces a caption somewhere worse.
            cost: dim ? COST_OVER_DIM_STAR : COST_OVER_STAR
        };
    });

    // Longest captions first: they are the hardest to place, and placing them
    // while there is still room gives a better result overall.
    const order = stars
        .map((star, index) => index)
        .filter((index) => stars[index].label && !stars[index].decorative)
        .sort((a, b) => stars[b].label.length - stars[a].label.length);

    order.forEach((index) => {
        const star = stars[index];
        const text = truncateLabel(star.label, labelChars);
        const halfW = text.length * m.labelCharHalf;
        const height = m.labelSize * 1.15;

        // Which way is emptiest? Sum the inverse-square pull of nearby stars
        // and head the opposite way.
        let crowdX = 0;
        let crowdY = 0;
        stars.forEach((other, j) => {
            if (j === index) return;
            const dx = other.tx - star.tx;
            const dy = other.ty - star.ty;
            const d = Math.hypot(dx, dy);
            if (d < 1 || d > m.labelSize * 9) return;
            crowdX += dx / (d * d);
            crowdY += dy / (d * d);
        });
        const crowd = Math.hypot(crowdX, crowdY) || 1;
        const awayX = -crowdX / crowd;
        const awayY = -crowdY / crowd;

        const candidates = LABEL_SIDES.map((side, rank) => {
            const len = Math.hypot(side.dx, side.dy) || 1;
            const align = (side.dx / len) * awayX + (side.dy / len) * awayY;
            // Alignment with the empty direction decides, with a small bias
            // towards the earlier (better-reading) sides to break ties.
            return { side, score: align - rank * 0.02 };
        }).sort((a, b) => b.score - a.score);

        let best = null;
        let bestPenalty = Infinity;

        // Each side is tried at increasing distances. A caption pushed a little
        // further out still clearly belongs to its star, and the extra rings are
        // what let a crowded figure (nine projects on one shape) resolve at all
        // instead of settling for a caption printed over a star.
        for (let r = 0; r < LABEL_RINGS.length && bestPenalty > 0; r++) {
            const ring = LABEL_RINGS[r];

            for (let c = 0; c < candidates.length; c++) {
                const side = candidates[c].side;
                const gapX = (m.starRadius + m.starHalo + m.labelGapSide) * ring;
                const gapY = (side.dy > 0 ? m.labelGapBelow : m.labelGapAbove) * ring;

                const x = star.tx + side.dx * gapX;
                const y = star.ty + (side.dy === 0 ? m.labelSize * 0.34 : side.dy * gapY);

                const left = side.anchor === 'middle' ? x - halfW
                    : side.anchor === 'start' ? x : x - halfW * 2;
                const top = y - m.labelSize * 0.8;
                const box = { left, right: left + halfW * 2, top, bottom: top + height };

                let penalty = 0;
                // Off-canvas is disqualifying: a clipped caption is unreadable.
                if (box.left < edge || box.right > svgWidth - edge ||
                    box.top < edge || box.bottom > svgHeight - edge) {
                    penalty += COST_OFF_CANVAS;
                }
                // Text over another caption and text over a star are equally
                // unreadable, so they cost the same.
                placed.forEach((other) => { if (boxesOverlap(box, other, pad)) penalty += COST_OVER_LABEL; });
                starBoxes.forEach((sb) => { if (boxesOverlap(box, sb, 0)) penalty += sb.cost; });

                // Nudge towards the nearer rings when nothing is clean.
                const adjusted = penalty === 0 ? 0 : penalty + r * 4;

                if (adjusted < bestPenalty) {
                    bestPenalty = adjusted;
                    best = { box: box, x: x, y: y, anchor: side.anchor };
                }
                if (penalty === 0) break;
            }
        }

        // Last resort: nothing was clean, so at least keep it on the canvas.
        if (bestPenalty >= COST_OFF_CANVAS) {
            const shiftX = Math.min(0, svgWidth - edge - best.box.right) +
                           Math.max(0, edge - best.box.left);
            const shiftY = Math.min(0, svgHeight - edge - best.box.bottom) +
                           Math.max(0, edge - best.box.top);
            best.x += shiftX;
            best.y += shiftY;
            best.box = {
                left: best.box.left + shiftX,
                right: best.box.right + shiftX,
                top: best.box.top + shiftY,
                bottom: best.box.bottom + shiftY
            };
        }

        // Clipping a small dim point is acceptable (star charts do it all the
        // time); running into a caption or a bright star is not.
        if (bestPenalty >= COST_CONFLICT) conflicts++;

        placed.push(best.box);
        placements[index] = { x: best.x, y: best.y, anchor: best.anchor, text: text };
    });

    return { placements: placements, conflicts: conflicts };
}

/**
 * Lay the captions out, shrinking them until they actually fit.
 *
 * Placement alone cannot always win: some real constellations pack their stars
 * tightly, and nine long project names will not sit cleanly on one of those at
 * full size however they are arranged. So this asks for a layout, and if any
 * caption had to settle for a bad spot it shortens the text, then reduces the
 * type, and asks again. It stops at the first clean result - which for most
 * figures is the very first attempt, at full size.
 */
function layoutLabels(stars, m, svgWidth, svgHeight) {
    let chars = 18;
    let size = m.labelSize;
    let best = null;

    for (let pass = 0; pass < 7; pass++) {
        const trial = placeLabels(
            Object.assign({}, m, { labelSize: size, labelCharHalf: size * GLYPH_HALF_EM }),
            stars, svgWidth, svgHeight, chars
        );

        if (!best || trial.conflicts < best.conflicts) {
            best = { placements: trial.placements, conflicts: trial.conflicts, size: size };
        }
        if (trial.conflicts === 0) break;

        // Shorten before shrinking: a slightly abbreviated name at a readable
        // size beats the full name at a size nobody can read.
        if (chars > 10) chars -= 3;
        else if (size > m.labelSize * 0.72) size *= 0.9;
        else break;
    }

    return best;
}

/**
 * Render constellation on SVG canvas with improved visuals
 * @param {Object} constellation - Constellation object with stars and connections
 * @param {SVGElement} svg - SVG element to render on
 * @param {Object} [options]
 * @param {Function} [options.onStarClick] - custom click handler (star, index) => void.
 *   Defaults to navigating/opening `star.link` (used for the home page nav constellation).
 */
function renderConstellation(constellation, svg, options = {}) {
    const { onStarClick } = options;

    // Clear existing content
    svg.innerHTML = '';

    // Remember what was drawn so a resize can re-render the same constellation
    // at the new size rather than picking a different one.
    svg.__constellation = { constellation, options };

    const m = metricsFor(svg);
    const svgWidth = m.vbWidth;
    const svgHeight = m.vbHeight;
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

    if (!constellation.stars || constellation.stars.length === 0) {
        return;
    }

    // Compute bounding box of the raw star coordinates
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    constellation.stars.forEach((star) => {
        if (star.x < minX) minX = star.x;
        if (star.x > maxX) maxX = star.x;
        if (star.y < minY) minY = star.y;
        if (star.y > maxY) maxY = star.y;
    });

    const rawWidth = maxX - minX || 1;
    const rawHeight = maxY - minY || 1;

    // Longest (post-truncation) label on screen, in characters - used to
    // keep both the outer margin and inter-star spacing wide enough that
    // captions never run off the canvas edge or into one another.
    const longestLabel = constellation.stars.reduce(
        (max, star) => Math.max(max, truncateLabel(star.label || '').length),
        0
    );
    const labelHalfWidth = (longestLabel * m.labelCharHalf) + m.edgePadding; // ~half a caption

    // Scale up and center the constellation within the SVG, with a margin
    // wide enough that even an edge star's caption stays on-canvas.
    const margin = Math.max(m.hitRadius * 1.6, labelHalfWidth);
    const scale = Math.min(
        (svgWidth - 2 * margin) / rawWidth,
        (svgHeight - 2 * margin) / rawHeight
    );

    const offsetX = (svgWidth - rawWidth * scale) / 2 - minX * scale;
    const offsetY = (svgHeight - rawHeight * scale) / 2 - minY * scale;

    // Precompute transformed positions so shapes are bigger and centered
    const transformedStars = constellation.stars.map((star) => ({
        ...star,
        tx: star.x * scale + offsetX,
        ty: star.y * scale + offsetY
    }));

    // NOTHING moves the stars from here on. The transform above is a single
    // uniform scale plus a translation, so what renders is the real
    // constellation's true geometry - every angle and every relative distance
    // preserved. Captions are fitted around the stars (see placeLabels), never
    // the other way round.

    // Create a group for lines
    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    linesGroup.setAttribute('class', 'constellation-lines');

    // Draw connections (lines between stars)
    // Every line the star chart draws, exactly as the chart draws it. (This
    // used to be filtered so no star had more than two lines, which quietly
    // deleted the hub stars that give shapes like Orion and Cygnus their
    // recognisable form.)
    const connections = (constellation.connections || []).filter(
        ([a, b]) => transformedStars[a] && transformedStars[b]
    );

    connections.forEach((connection, idx) => {
        const [starIndex1, starIndex2] = connection;
        const star1 = transformedStars[starIndex1];
        const star2 = transformedStars[starIndex2];

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', star1.tx);
        line.setAttribute('y1', star1.ty);
        line.setAttribute('x2', star2.tx);
        line.setAttribute('y2', star2.ty);
        line.style.animationDelay = `${idx * 0.1}s`;

        linesGroup.appendChild(line);
    });

    svg.appendChild(linesGroup);

    // Create a group for stars and labels
    const starsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    starsGroup.setAttribute('class', 'stars-group');

    // Fit the captions around the fixed stars. Because the stars can no longer
    // be nudged apart, this is where crowding gets resolved: each caption tries
    // a ring of positions around its star and takes the first that clears the
    // other captions, the other stars, and the canvas edge - preferring
    // whichever side of the star is emptiest.
    const layout = layoutLabels(transformedStars, m, svgWidth, svgHeight);
    const placements = layout.placements;
    m.labelSize = layout.size;

    // Draw stars
    transformedStars.forEach((star, index) => {
        const isDecorative = !!star.decorative || !star.label;

        // Create a group for this star and its label
        const starGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        starGroup.setAttribute('class', isDecorative ? 'star-group star-group-decorative' : 'star-group');
        starGroup.style.cursor = !isDecorative && (onStarClick || star.link) ? 'pointer' : 'default';

        // Two circles per interactive star: an invisible one carrying the
        // pointer target (kept generous, so it stays easy to hit on touch),
        // and a smaller visible one that actually looks like a star rather
        // than a flat disc. Decorative stars need only the visible circle -
        // they are small, dim, and complete the true outline without
        // competing for attention with the clickable stars.
        const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        core.setAttribute('cx', star.tx);
        core.setAttribute('cy', star.ty);
        core.setAttribute('r', isDecorative ? m.decorRadius : m.starRadius);
        core.setAttribute(
            'class',
            isDecorative ? 'constellation-star constellation-star-decorative' : 'constellation-star'
        );
        core.setAttribute('data-index', index);
        core.style.animationDelay = `${index * 0.15}s`;

        const circle = isDecorative
            ? core
            : document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        if (!isDecorative) {
            circle.setAttribute('cx', star.tx);
            circle.setAttribute('cy', star.ty);
            circle.setAttribute('r', m.hitRadius);
            circle.setAttribute('class', 'constellation-hit');
            circle.setAttribute('data-index', index);
            if (star.link) circle.setAttribute('data-link', star.link);
        }

        // Native tooltip: the item label when there is one, otherwise the
        // real star's own name (a little "hidden detail" on hover).
        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = star.label || star.name || '';
        circle.appendChild(titleEl);

        if (!isDecorative) {
            // Add click handler
            circle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (onStarClick) {
                    onStarClick(star, index);
                    return;
                }
                if (star.link) {
                    // Check if it's an external link (LinkedIn, Kaggle, GitHub)
                    if (star.link.startsWith('http')) {
                        window.open(star.link, '_blank');
                    } else {
                        window.location.href = star.link;
                    }
                }
            });

            // Add hover effect to show label
            circle.addEventListener('mouseenter', () => {
                const label = starGroup.querySelector('.constellation-label');
                if (label) {
                    label.classList.add('visible');
                }
            });

            circle.addEventListener('mouseleave', () => {
                const label = starGroup.querySelector('.constellation-label');
                if (label) {
                    label.classList.remove('visible');
                }
            });
        }

        // The visible star sits under the hit target.
        starGroup.appendChild(core);
        if (circle !== core) starGroup.appendChild(circle);

        if (!isDecorative) {
            // Create label text. Placed above or below depending on where
            // this star's closest neighbor is, so nearby stars' captions
            // land on opposite sides instead of colliding.
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            const place = placements[index];
            label.setAttribute('x', place.x);
            label.setAttribute('y', place.y);
            // Inline styles, not presentation attributes: a stylesheet rule
            // would win over an attribute and undo the placement.
            label.style.textAnchor = place.anchor;
            // Inline style, not a presentation attribute: the inherited body
            // font-size would otherwise win and shrink every caption.
            label.style.fontSize = m.labelSize + 'px';
            label.setAttribute('text-anchor', place.anchor);
            label.setAttribute('class', 'constellation-label');
            label.setAttribute('data-index', index);
            label.textContent = place.text;

            starGroup.appendChild(label);
        }

        starsGroup.appendChild(starGroup);
    });

    svg.appendChild(starsGroup);

}

/* Keep the drawing in step with the box it lives in.

   The SVG's height comes from CSS (flex space on the home page, an explicit
   height on the projects page), so it changes when the window resizes, when
   the web font finishes loading and reflows the hero, or when a view toggles.
   Re-render on any of those so stars and captions keep their intended
   on-screen size. The constellation itself is never re-picked, so the sky does
   not change under the reader mid-session. */
(function watchConstellationSize() {
    if (typeof window === 'undefined') return;

    const SELECTOR = '#constellationCanvas, #projectsConstellation';
    const lastSize = new WeakMap();

    function redraw(svg) {
        const state = svg.__constellation;
        if (!state) return;

        const { width, height } = svg.getBoundingClientRect();
        if (height < 1 || width < 1) return;

        // Re-rendering does not change the element's own box, so this cannot
        // loop; the threshold just avoids churn on sub-pixel reflows.
        const previous = lastSize.get(svg);
        if (previous && Math.abs(previous.width - width) < 2 && Math.abs(previous.height - height) < 2) {
            return;
        }
        lastSize.set(svg, { width, height });

        renderConstellation(state.constellation, svg, state.options);
    }

    function redrawAll() {
        document.querySelectorAll(SELECTOR).forEach(redraw);
    }

    // Window resize is the guaranteed signal and covers the common case.
    let timer = 0;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(redrawAll, 180);
    });

    // A ResizeObserver catches the rest - a container reflowing without the
    // window changing, which is what happens when the view toggles or a late
    // stylesheet lands. Additive, not a replacement: `lastSize` means whichever
    // fires first does the work and the other is a no-op.
    if (typeof ResizeObserver === 'function') {
        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => redraw(entry.target));
        });
        const observeAll = () => document.querySelectorAll(SELECTOR).forEach((svg) => observer.observe(svg));
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', observeAll);
        } else {
            observeAll();
        }
    }

    // The web font lands after first paint and reflows the hero, which changes
    // how much room is left for the constellation.
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(redrawAll).catch(() => {});
    }
}());
