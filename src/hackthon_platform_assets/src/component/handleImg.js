export const uint8ArrayToBase64 = (uint8Array) => {
    let array = new Uint8Array(uint8Array);
    var length = array.byteLength;
    var table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'];
    var base64Str = '';
    for (var i = 0; length - i >= 3; i += 3) {
        var num1 = array[i];
        var num2 = array[i + 1];
        var num3 = array[i + 2];
        base64Str += table[num1 >>> 2]
            + table[((num1 & 0b11) << 4) | (num2 >>> 4)]
            + table[((num2 & 0b1111) << 2) | (num3 >>> 6)]
            + table[num3 & 0b111111];
    }
    var lastByte = length - i;
    if (lastByte === 1) {
        var lastNum1 = array[i];
        base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '==';
    } else if (lastByte === 2) {
        var lastNum1 = array[i];
        var lastNum2 = array[i + 1];
        base64Str += table[lastNum1 >>> 2]
            + table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)]
            + table[(lastNum2 & 0b1111) << 2]
            + '=';
    }
    return "data:image/png;base64," + base64Str;
}

export const compressUpload = (image, file) => {
    let compressData
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let { width } = image, { height } = image
    let fileSize = parseFloat(parseInt(file.size) / 1024).toFixed(2);
    canvas.width = width
    canvas.height = height
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, width, height)
    if (fileSize <= 500) {
        compressData = canvas.toDataURL(file.type || 'image/jpeg')   //500kb以内默认
    } else if (fileSize > 500 && fileSize <= 1024) {
        compressData = canvas.toDataURL(file.type || 'image/jpeg', 0.8) //500kb-1mb以内压缩0.8
    } else {
        compressData = canvas.toDataURL(file.type || 'image/jpeg', 0.6) //大于1mb的都压缩0.6
    }

    return compressData //base64
}

export const base64ToUint8Array = (base64String) => {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const beforeUpload = (file) => {
    return new Promise((resolve, reject) => {
        let image = new Image(), resultFile = '';
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            // 调用方法获取File文件格式
            resultFile = compressUpload(image, file);
            resolve(resultFile)
        }
        image.onerror = () => {
            reject()
        }
    })
}