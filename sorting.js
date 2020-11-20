const input = [4, 9, 7, 5, 8, 9, 3];

console.log('Input', input.join(' '))

function sorting(input) {
  if (!Array.isArray(input)) {
    throw new Error('Input harus berupa array');
  }

  const length = input.length; // hitung jumlah input
  let swapCount = 0; // jumlah swap

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (input[j] > input[j + 1]) { // jika angka sebelumnya lebih besar dari angka setelahnya maka tukar posisi
        swapCount++; // tambah jumlah swap
        const x = input[j]; // angka pertama
        const y = input[j + 1]; // angka kedua
        // Tukar posisi angka
        input[j] = y;
        input[j + 1] = x;
        console.log('%d. [%d, %d] -> %s', swapCount, y, x, input.join(' '))
      }
    }
  }

  console.log('Jumlah swap', swapCount);
}

sorting(input);
