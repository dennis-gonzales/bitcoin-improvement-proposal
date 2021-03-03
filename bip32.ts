import * as bip32 from 'bip32';
import { BIP32Interface } from 'bip32';
let node: BIP32Interface = bip32.fromBase58('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi');

let child: BIP32Interface = node.derivePath('m/0/0');

console.log(child);
