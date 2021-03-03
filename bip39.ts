import { 
    generateMnemonic, 
    mnemonicToSeedSync,
    validateMnemonic,
    entropyToMnemonic,
    mnemonicToEntropy,
    wordlists
} from 'bip39';

// |  ENT  | CS | ENT+CS |  MS  |
// +-------+----+--------+------+
// |  128  |  4 |   132  |  12  |
// |  160  |  5 |   165  |  15  |
// |  192  |  6 |   198  |  18  |
// |  224  |  7 |   231  |  21  |
// |  256  |  8 |   264  |  24  |

const entropyLength = [128, 160, 192, 224, 256];
const strength = entropyLength[4];

/** Generate Entropy, Mnemonic Words and Seed
*/
console.log();
const mnemonic = generateMnemonic(
    strength, 
    null, 
    wordlists.EN);
console.log("generatedMnemonic: ", mnemonic);
console.log();


const numberOfWords = (strength + (strength / 32)) / 11;
console.log("numberOfWords: ", numberOfWords);
console.log();


const seed = mnemonicToSeedSync(mnemonic, "thicc thigs");
console.log("seed: ", JSON.stringify(seed));
console.log();


const seedInHex = mnemonicToSeedSync(mnemonic, "thicc thigs").toString('hex');
console.log("seedInHex: ", JSON.stringify(seedInHex));
console.log();


const entropy = mnemonicToEntropy(mnemonic, wordlists.EN);
console.log("entropy: ", entropy);
console.log();


const isValid = validateMnemonic(mnemonic);
console.log("isValid: ", isValid);
console.log();


console.log("--------------------------------------");

/** Retrieve Entropy, Mnemonic Words and Seed
*/
const retievedMnemonic = entropyToMnemonic(entropy);
console.log("retievedMnemonic: ", retievedMnemonic);
console.log();


// refenrences
// https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
// https://github.com/bitcoinjs/bip39