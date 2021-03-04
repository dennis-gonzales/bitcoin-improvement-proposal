import * as bip39 from 'bip39';
import Wallet, { hdkey } from 'ethereumjs-wallet';

const mnemonic: string = bip39.generateMnemonic();
console.log("generatedMnemonic: ", mnemonic);
console.log();

const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic);
console.log("seed: ", seed.toString("hex"));
console.log();


const hd: hdkey = hdkey.fromMasterSeed(seed);
const privateExtendedKey: Buffer = hd.privateExtendedKey();
const publicExtendedKey: Buffer = hd.publicExtendedKey();


console.log("privateExtendedKey(BIP32 Root Key): ", privateExtendedKey);
console.log();

console.log("publicExtendedKey(BIP32 Root Key):", publicExtendedKey);
console.log();

for (let i = 0; i < 3; i++) {
    // We define the following 5 levels in BIP32 path:
    // m / purpose' / coin_type' / account' / change / address_index
    
    const derivationPath = `m/44'/60'/0'/0/${i}`;
    const node = hd.derivePath(derivationPath);
    const wallet: Wallet = node.getWallet();

    console.log("derivationPath: ", derivationPath);
    console.log("walletAddress: ", wallet.getAddress().toString("hex"));
    console.log("privateKey: ", wallet.getPrivateKeyString());
    console.log("publicKey: ", wallet.getPublicKey().toString("hex"));
    console.log();
}

/**
 * References
 * https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
 * https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
 * https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 * https://github.com/satoshilabs/slips/blob/master/slip-0044.md
 * 
 * Based on:
 * https://www.mobilefish.com/download/ethereum/hd_wallet.html
 */