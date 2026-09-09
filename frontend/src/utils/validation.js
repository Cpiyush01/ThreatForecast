export const isValidPcapFile = (file) => {
  if (!file) return false;
  const validExtensions = ['.pcap', '.pcapng', '.cap'];
  const fileName = file.name.toLowerCase();
  return validExtensions.some((ext) => fileName.endsWith(ext));
};

export const isValidSpeed = (speed) => {
  const num = Number(speed);
  return !isNaN(num) && num > 0 && num <= 100;
};
