import * as bip39 from 'bip39';
import { wordlists } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
// import * as bip32 from 'bip32';
// import { BIP32Interface } from 'bip32';

// let node: BIP32Interface = bip32.fromBase58('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi');
// let child: BIP32Interface = node.derivePath('m/0/0');
// console.log(child);

const entropyLength = [128, 160, 192, 224, 256];
const strength = entropyLength[4];

const mnemonic: string = bip39.generateMnemonic(
    strength, 
    null, 
    wordlists.EN);
console.log("generatedMnemonic: ", mnemonic);
console.log();

const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic);

const hd: hdkey = hdkey.fromMasterSeed(seed);

const privateExtendedKey: Buffer = hd.privateExtendedKey();
const publicExtendedKey: Buffer = hd.publicExtendedKey();

/**
 * BIP32 explains how master keys and master chain code:
 * are created from BIP 39 seed
 * 
 * The chain code is used as entropy in the Child Key Derivation(CKD) Function
 * 
 * Child Key Derivation(CKD) Function = HMAC SHA512 hash function:
 * input: (index_no, chain_code, parent priv/pub key)
 * output:
 *   hash left
 *   hash right (chain code)
 * 
 * Normal keys(index): i = [0, 2**31-1] => usage (Public Key)
 * Hardened keys(index): i = [2**31, 2**32-1]  => usage (Private Key)
 * 
 * H => Child Private Key
 * input: (parent priv key, hash left)
 * output: child pub key
 * 
 * N => Child Public Key
 * input (parent pub key, hash left)
 */
console.log("seed(BIP39 Seed): ", seed.toString("hex"));
console.log();

/**
 * Entented Private Key (xprv) = 
 * parent private key + parent chain code
 * 
 * Can create a complete branch with child private keys and child public keys
 */
console.log("privateExtendedKey(BIP32 Root Key): ", privateExtendedKey);
console.log();

/**
 * Entented Pub Key (xpub) = 
 * parent public key + parent chain code
 * 
 * Creates only a branch of child public keys.
 * 
 * Cannot create hardened keys.
 */
console.log("publicExtendedKey(BIP32 Root Key):", publicExtendedKey);
console.log();

// sources
// https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
// https://github.com/bitcoinjs/bip44-constants
// https://github.com/ethereumjs/ethereumjs-wallet
// https://www.mobilefish.com/download/ethereum/hd_wallet.html