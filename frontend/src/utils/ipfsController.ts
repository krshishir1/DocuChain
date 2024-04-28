export const pinFileToIPFS = async function (docFile: any) {
  try {
    // loading image in IPFS and getting the hash

    const formData = new FormData();
    formData.append("file", docFile);

    const result = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
        body: formData,
      }
    );

    const { IpfsHash } = await result.json();

    return IpfsHash;
  } catch (err) {
    console.error(err);
  }
};
