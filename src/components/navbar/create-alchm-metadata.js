export default { createMetadata }

const defaultImageAddress = "ipfs://QmSZZL6aQqSoy5Wi7dj2CKg3vvyDWVVZud7QcMREEfK1Ea";
const imageDict = {"Aries": "ipfs://QmeMxe7K56khvgrruvaAwt3aiRt8KuzFSy6yTnkSDtrWro",
                   "Pisces": "ipfs://QmQVJk2uRLV1UNNPmUzxvWyo4GDpXEfS6VTArhYGSmbG9P",
                   "Leo": "ipfs://QmXoTNAmJFo4PGqBxBWRBEhpyZtaFYnsqqu8KBF4vLtQNC",
                   "Taurus": "ipfs://QmTrUmKepskWsZcSFxuGF6FEAGKMTD3MzWDfEMokF32Rbv",
                   "Scorpio": "ipfs://QmVF4t9fkwA44zeE7X6huXpHVU4JjS1RQr8PNgPNQytFjf",
                   "Cancer": "ipfs/QmdvHkYYwnKnXfBh2Vpm9ngG5s79zhQAkiWtah4zzpASx4",
                   "Capricorn": defaultImageAddress,
                   "Gemini": defaultImageAddress,
                   "Virgo": "ipfs://QmUxWL8EhQ8oeBGpq3AMXPEqG8ojqTGE9K1rKC5LLe9ksP",
                   "Aquarius": defaultImageAddress,
                   "Sagittarius": defaultImageAddress,
                   "Libra": defaultImageAddress};

async function createMetadata(astrologyInfo) {
    const metadata = new Object();
    metadata.name = "Alchm NFT";
    metadata.description = "Alchm is unlike any other NFT collection on Earth. Just like people, no two Alchm NFTs are the same, and there is no limit on how many can exist. Your Alchm NFT has no random features, and is completely customized and unique to you. By minting, you gain permanent access to limitless information about your astrology and identity through our sites and apps.";
    metadata.attributes = [];
    //metadata.attributes.push({"trait_type": "Edition",
    //                        "value": "1st Edition"});
    //metadata.attributes.push({"trait_type": "Rarity",
    //                        "value": "Legendary"});
    console.log(astrologyInfo);
    var entry, trait_type, value;
    var planet, sign, house;
    var astrologyInfoIndex = 0;
    while (metadata.attributes.length < 24) {
        entry = astrologyInfo['all'][astrologyInfoIndex];

        //Planet Sign
        planet = entry['label'];
        sign = entry['Sign']['label'];
        if (planet === 'Sun') {
            trait_type = '"Sign" (Sun Sign)';
            metadata.image = imageDict[sign];
        } else {
            trait_type = planet + " Sign";
        }
        value = sign;
        metadata.attributes.push({"trait_type": trait_type, "value": value});
        
        //Planet House
        trait_type = planet + " House";
        house = entry['House']['label'];
        value = house;
        metadata.attributes.push({"trait_type": trait_type, "value": value});

        astrologyInfoIndex+=1;
    }

    /*astrologyInfo['all'].forEach(entry =>
        metadata.attributes.push({"trait_type": entry['label'] + " Sign",
                                  "value": entry['Sign']['label']},
                                  {"trait_type": entry['label'] + " House",
                                  "value": entry['House']['label']}));*/
    return metadata
}


