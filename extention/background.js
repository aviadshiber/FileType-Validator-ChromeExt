
// chrome.downloads.onCreated.addListener(onCreatedCallback);
// chrome.downloads.onChanged.addListener(onChangedCallback);
chrome.downloads.onDeterminingFilename.addListener(onDeterminingFilenameCallback);
function onCreatedCallback (downloadDelta) {
}
function getRemoteFile() {}
// function onChangedCallback(downloadDelta) {
//     if(downloadDelta.endTime != undefined){
//         chrome.downloads.search({
//             limit: 1,
//             id: downloadDelta.id,
//             orderBy: ["-startTime"]
//         }, checkDownload);
//     }
// }

function pauseEvent() {
    console.log("paused")
}
function onDeterminingFilenameCallback(downloadDelta) {
    chrome.downloads.pause(downloadDelta.id)
    console.log(downloadDelta)
    downloadFileData(downloadDelta.url, downloadDelta.id)
    // chrome.downloads.pause(downloadDelta.id, pauseEvent)
    // // alert(JSON.stringify(downloadDelta))
    // chrome.downloads.search({
    //     limit: 1,
    //     id: downloadDelta.id,
    //     orderBy: ["-startTime"]
    // }, checkDownload);
}
function downloadFileData(url, id) {
    console.log("downloadFileData: " + url)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (oEvent) {
        var arrayBuffer = xhr.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            console.log(arrayBuffer)
            sendFile(arrayBuffer, id)
        }
    }
    xhr.send();
}
// function checkDownload(downloads) {
//     for (let download of downloads) {
//         // alert(JSON.stringify(download))
//         path = "file://" + download.filename
//         // alert(path)
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", path, true);
//         xhr.responseType = "blob";
//         xhr.onload = function (oEvent) {
//         var arrayBuffer = xhr.response; // Note: not oReq.responseText
//         if (arrayBuffer) {
//             var byteArray = new ArrayBuffer(arrayBuffer);
//             console.log("bytearray" + byteArray)
//         }
//         };
//         xhr.send();
//     }
// }

function notify() {
    chrome.notifications.create('', {  
        title: 'File not allowed',
        message: 'You are not allowed to use this type of files',
        iconUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SEA8TEw8PFRMXDw8VFRUXDw8PEhISFREWFhUTExUYHSggGBslGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQGi0fICUtLS0tLS0wNy0tKy0tLS0tLS0tLS03LS0tLS0tKy0tLS0tLS0tKysuLS0tLS0tKy0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQcCBQYDBP/EAD4QAAECAwQHAwkIAgMBAAAAAAEAAgMRMQQhYXEFBkFRsfDxEoHSBxMiQlKRkqHBFBYjMkNicsJT0WOCorL/xAAaAQEAAwEBAQAAAAAAAAAAAAAABAUGAwEC/8QAMhEBAAEDAgIJAwUBAAMBAAAAAAECAzEEYRFRBRITFCFBcZHRFYGxIjLB4fChM0LxI//aAAwDAQACEQMRAD8Au9AnuQCdg6IBOzagEyzQCZZoE5VQJ7SgA7SgA+5ABnlxQJzyQJ7kAnYOiATsFUAmWaATLNAnKqBPaUAHaUAFABnlxQAZ5IE9yATsHRAJ2BAJ96CZoCCDuQRgOiBS4V5vKBTNApmgUvNebggYnogYlArkgVy4oFcuKBgEDAdEHjarZChD04kNmLntZxK+aq6af3TwdLdqu5PCimZ9I4sLLpGzxLocaE925sRjj3gFeU3KKv2zEvbli7b/AH0zHrD6aYlfbkUvNebggYnogYlAreac1QK5cUCuXFArcEDAdEClwQKZoFMSgkCVaoJQQTsHRBFLhXm8oFM0CmaBS815uCBieiBiUCuSBXLigVy4oGAQMB0QaLW3Tn2WEGsl518w2d/ZG15G3DE4KNqb3Z0+GZWPR2j7xc/V+2M/Cs40Vz3FznOc41cSSTmVUTM1Txlq6aaaIimmOEMAZSO3YaGeCPp32pOsLohMGM7tPAnDcfzOAq07yKz2ie5WWk1E1foq+zOdK6Cm3Ha244R5xyddieinKQxKBW805vQK5cUCuXFArcOckDAdEClwQKZoFMSgUvNebggkDaeiCUEE7qoIpmgUzQKXmvNwQMT0QMSgVyQK5cUCuXFAwCBgOiDGLEaxpJIAAJJNAAJkleTMRHGXtNM1TERmVSac0kbRHfEM5EyYD6rBQfXMlUl65Nyuam00mnjT2oojPn6vgXNJwIYetltDob2RGmTmuDgcR9F7TVNMxMPi5bprpmmrErc0Vbmx4LIwoRT2XC5wOIM1eW64rpiqGK1Fiqzcqt1eT663mnNV9uJXLigVy4oFbhzgEDAdEClwQKZoFMSgUvNebggYnogkDaUEzQQTLNBFM0Cl5rzcEDE9EAbygVyQK5cUCuXFAwCBgOiBS4c4lBx+v+luywWZh9J8nRDuZO5veR7hioGtu8I6kfdedD6XjVN6ry8I9ef2/wBhwarmiwICG8iDqNRNLebjeZefQiH0dwiyu94uzAUzR3erV1JxP5VHS2l7S32tOafx/XysSuXFWjMFcuKBW4c5IGA6IFLggUzQKYlApea83BAxPRAxPRBIvvQZTQYkyzQRS815uCBieiBiUCuSBXLigVy4oGAQMB0QKXDnEoPn0jbGQIT4jqNaTiTsHeZDvXxXXFFM1S62bVV25TRTmVQ221PixHxHmbnuJP0AwAkO5UddU11TVLa2rVNqiKKcQ8V46YEN5EBDICa03b570wZWvqzpX7VAa4kdtvoxB+4bciL/AJK5093tKInz82N12m7vemmMT4x6f02tbhzgu6GYDogUuCBTNApiUCl5rzcEDE9EDE9ECt5pzeUEi/LigyQYm69BGJ6IGJQK5IFcuKBXLigYBAwHRApcOcSgUzQcBr7pbtRBAaZtYZv/AHRJXNyA+ZwVZrLvWq6keTSdEaXqUTeqzOPT+3JKEusCG8iAhkQyIZbnVTS32e0CZlDfJsTcB6ru4/Ild9Nd7OvxxKB0jpe8WpinMeMfH3/K057B0VyyBS4IFM0CmJQKXmvNwQMT0QMT0QK3mnN5QK5cUEznlxQZIMTvKCMSgVyQK5cUCuXFAwCBgOiBS4c4lApmg1usGkxZYD4lxefRYN7yLu4VyC5XrvZ0TKVo9NOouxR5efoqZ7iSSSSSSSTUkmZKpOPFs4iKY4QhHu8iAhkQyIZEBD0WRqRpfzsDzRP4kMAX1MP1XYyp3DerXSXevR1ZzDLdK6XsrvXpxV+fP5dJTNS1UUxKBS815uCBieiBieiBW805vKBXLigVy4oJnuogmSCCNpQRXJArlxQK5cUDAIGA6IFLhziUCmaBTNBWGuGlvPxyAZw4c2t3F0/ScO8SyGKp9Vd7SvhGIa3ozS9hZ41fuq8Z/iGiUdY7yIPt0PoyJaYohsu2ucaMaKuP+sV92rc3KurCPqdRTYtzXX9o5ysXR2q1jhgThNiHa6IA8uO+RuAyCtaNLbpjHH1Zi90lqLs/u6sco8P7e1p1escQEGzwgN7GiG7uLZL6q09qr/1hzo1+oonjFc/fx/LgdZtAusrxIl0JxPZdtBFWOx4qsv2JtTs0mh10amnhiqM/MNKuCftAhtD7tC6SdZo7IrZmRk4e0w/mH1zAXS1cm3XFSPqtPF+1Nuft6rbgRWua17T2g4Ag7wRMFXcTExxhi6qZoqmmrMM6XmvNwXr5MT0QMT0QK3mnN5QK5cUCuXFArcKc3BBM9gQTJBBHuQRXLigVy4oGAQMB0QKXDnEoFM0CmaDQa5aW+zwC1p/FiTa3e1vrOHDMhRdVd6lHCMysujNL213rVftp8fXlCslUtZvIgIZd75OLOPNR37TFDe5rQeLirLQ0/pqlnOm65m5RT5cOPvP9OvrlxU5SFbgg0mucAPsUYSvaGvGBDh9Cfeo+qp42pT+jK5p1NHDz8FXKna/aBDAhh3Pk/wBL3Os7zeJuh4t9ZgyN/edysdFd4/on7M90xpeExep8/Cf4l2eJ6KeojE9ECt5pzeUCuXFArlxQK3CnNwQMB0QTS4IJQQRPLigiuXFAwCBgOiBS4c4lApmgUzQQ94aC5xAABJOwAXleTPDxl7ETMxEKl0/pM2mO+IZ9n8rB7LBTvNTmqW9d7SuZbPR6aNPainz8/VrlyShDIhl3vk4iTgx2bood8TAP6qy0M/pqjdnOm6f/ANKKtvxP9uvrcFOUhgOiDT64RA2xWjFrR8T2j6rhqZ4Wqk7o2njqrf8AvJVapmwwIYEMPWyWl8KIyI0yc1wIzGw4GnevaappmJh8XLdNyiaa8St7RltZHhMjNo5s5eyaEHEGYV5briumKoYq/Zqs3KqKvJ9NbzTm8r7cSuXFArlxQK3CnNwQMB0QMAgkXXbUGSDE35IIwCBgOiBS4c4lApmgUxKBS815uCDkNftLdhggNPpPE3/thzub3ke4HeoOtu8I6keeV30PpetVN6rEY9f6cEq1oxDIhkQy7DycRfxbQzfDY74XEf2U7Qz+qqFJ03Txot1cpmPf/wCO8wHRWTOFLgg5rygxezZA3a6MwZyBd/VRNbPC3w3W3Q1PHUceUT8K4VU1GBDAhvIhvLqtQtLdiKYDz6EQzbuESX1F2YG9TNHd6tXUnz/Kn6X0vaUdrTmnPp/Swq5cVaMyVy4oFbhTm4IGA6IGAQKXCvN5QSLs0EoIO5BGA6IFLhziUCmaBTEoFLzXm4IPC3WtkGG+LENzWk/6AxJkO9fNdcUUzVLpZtVXa4opzKobfa3xor4r/wAznTyFABgBIdyo665rqmqfNtrNqm1RTRTiHgvl0yIZEMiDodQ4vZtjR7UKI3g/+ilaOeF37Kzpenjpp2mJ/j+Vl0uCtmUKZ81QcX5SYsm2Zm0uiuPcGgf/AEVX6+fCmF90HT43KvSPz8OHVe0GBDeRDeRDKWuIIIJBBBB2gihCYJjreE4Wvq5pX7VAa/1h6MQfvG7A3HvV1Yu9pRE+fmxmt03d7s0+WY9G0rcKc3BdkQwHRAwCBS4V5vKBTEoJAlWqCUEE7B0QRS4c4lApmgUzQKXmvNwQMT0QcDr9pftvEBp9FknPxfK5vcL8zgqzW3eM9SPu0fQ+l6tM3qszj05/f/ZcioS7yIZEMiAhtDaarxexbLMf+QN+IFv1XXTzwu0yia+nraa5G348VsUzV2xhTEoK98okWdpht9mCD3ue7/QVXrp41xGzTdC08LNVXOfxEOVUNcbyIbyIZEMiGW71R0t9ntABMocSTX7h7Lu4n3EqRprvZ1+OJV/SWl7e1+nMeMfzH+81o4DorhkTAIFLhXm8oFMSgUvNebggkDaUEoIJ2CqCKZoFM0Cl5rzcEDE9EGv09pMWeA+KZdqjGna80/3kCuV652dE1JWj0837sUeXn6KliPLiXOJJJJJNSSZklUkzx8ZbOmmIiIjwiGKPciGRAQ2gQ2h7WKL2IsJ3sxGO9zgV7TPCqJfF2nrUVU84n8LmpiSr9hCl5rzcEFX66Re1bY37RDb7mA8SVT6qeN2Wu6Lp6ulonnxn/rRqOsN5EMiGRDIgIeiytStL+egebJ/EhyacWeq76d2KttJd69HCcwynSml7G71qcVfnzdFS4V5vKlKwpiUCl5rzcEDEoJA2nogmaCCZZoIpmgUvNebggYnogAbSgrPXPS/n4/Zafw4c2t3Od6zvlIZYqo1V3r18IxDWdF6XsbXWqzV4/byc+oyyyIZEBDaBDaBDCCLl4R4Lm0fGDoMKJXtQobviaD9Vf0T1qYlhb1HUuVU8pmP+vcbz0X05qg05F7dqtDt8aJLIOIHyCo708blU7ttpKOrYtxtD4lzSMiGRDIgIbQIbQ+/QeknWaOyIKUePaYfzDgcwF0s3Jt1xUjavTxftTb8/L1W3CiNLWuaQ4OAII9YETBGCu4mJjjDF1UzTM0zmGVLzXm4L14YlAxPRBIvvQTNBBMs0EUvNebggYnogYlBodcNL+YgEAyiRJtZvA9Z/cD7yFG1V7s6PDMrHo3S9vd41ftp8Z/iP95KxCqGtyIZEBDaBDaBDAhgQwtbVOL2rFZ3HZD7PwOLfornTTxtUsd0jT1dTcjfj7+LavdIFxoATkAu8ocRxngpVzy4lxqSSczeVn+PHxb2I4eHlCEMiGRAQ2gQ2gQwIYd35P9Lza6zvPpNBdDxZO9oyJnkcFY6K7xjqT9md6Y0vVmL1Pn4T6/7/AHi7HEqeozE9ECt5pzeUEi/LigyQYm69BGJ6IGJQQ5wkXOMmgE33AAbSkzwexEzPCFT6xaUNpjviX9gejDG5goczXvVJfu9pXM+zZaLTRYtRR55n1axckvIgIbQIbQIYEMCGBDeVkagRZ2OR9SLEGU5O/srXRTxt8N2V6Yp4ajjziPj+G109F7NltLqSgxJZlpAPzXe9PC3VOyHpKetftxvH5VEqJtsi9MiAhtAhtAhgQwIYe1itT4URkRpk5rgRuxBwImO9e01TTVEw53bVNyiaK8St7R1sZGhMitPoubMD2TtBxBmFeUVxXTFUMVes1WblVFWYfRW805vK+3IrlxQTOeXFBkgxO8oIxKBW805qg5PX7S/ZhiA0+k8TfvEPd3n5AqFrLvVp6kef4XPQ+l69c3asRj1/pX6rGlyICG0CG0CGBDAhgQ3kQ3l3Hk5tDexaGucBJ7HCZA/M0if/AJVjoao4VQz/AE1bmardUR5TH+92010tTfsUUBzbzDaACCTN4n8gV21VURalD6LtTOpo4xjj+FZqoazIgIbQIbQIYEMCGBAQ3l1moOluxEMB59B5mydBEAvHePmMVN0d3q1dSfNTdL6Xr0dtTmM+n9LArlxVmzRXLigme6iDKSDEjaUEVvNOb0HjbbUyHDfEeZMa0k4y2DgvmuqKaZql0tW6rtcUU5lUWkba+PFiRXVc6eAFA0YASCo665rqmqW1sWabVum3TiP+vmXy6iG0CG0CGBDAhgQ3kQ3kAn9EN5dNo3Um0RWh0RzYQNAWl7+9t0vepdGirqjjPgqb/TFmieFETV/yPd7WrUOMATDjQ34FhhE4AzI4L6q0NUR4Tx/4+LfTduqeFdMxHv8ADl7RAexzmPaWuaZEESIKhzTNM8JW9FdNdMVUTxh5rx9bQIbQIYEMCGBAQ3kQSxxBBBIIIIO0EGYITDyYiqOE4Wzq9pQWqAx/rD0Yg/eBf3G496urF3tKIn3Y3W6adPdmjyzHo2VbhTm4LsiJnsCCZIIIQRXLig4TygaX7ThZmH0WydExd6re4X943Kt1t3jPUj7tF0PpeETeq8/CPTzlxygrwQ2gQ2gQwIYEMCG8iG8iGXXeT7RbYj3x3CYYQ1g2dsiZd3CXvU3RWomZrnyUnTOpmmmm1T5+M+jvq5cVZs4VuFObgg5bX7RjXwfPNHpw5AnfDJlI5Eg+/eoestRNPX84XHRGpqou9l5VflXiq2m2gQwIYEMCAhvIgIZEMt7qfpfzEcNcZQ4kmvwPqu7iZHAlSNLd7OvxxKu6S0vb2uNOafGP5hZ+A6K4ZJOAQSggieXFBr9OaTbZ4D4h2CTR7bz+VuW/AFcr1yLdE1JOk086i7FEff0VJFiOe5znGbiSSd5JmVSTMzPGW0ppimIpp8Ihij3aBDaBDAhgQwIbyIbyIZEMu+8nMYGDGZO8RQ44hzQB82lWWhn9NUbs503TPaUVeXDh7T/brq3CnNwU5SGA6INNrjHayxRxtcGtGbnD6TPco+qmItVJ/RtE1amjh5eKrFTtfgQwIYEBDeRAQyIZEMi8PRZmpml/PwAwn8SHJrsW+q/3CWYVvpbvXo4TmGT6U0vY3eNP7avH5h0NLtvN6lK1KCCJ5IK1130v56P5tp/DhEtwc/1j3U7jvVTq7vXr4RiGq6K0vZWuvOavx5fLnFFWm0CG0CGBDAhgQ3kQ3kQyIZEMvu0LpR9miiIy+6TmzkHtNW4Zrpauzbq60I+q01OotzRP2nlKydG6xWWM0dmK1rpXteQxzcJGvdNW1vUW648JZW/oL9meE08Y5x4x/vV72zTNlhNm6PDH/YOd3NF5X1VeopjjMudvSXrk8KaZ/wBurzWfT5tTwGgthNJ7INXH23Y4bFV6i/N2doabQaGNNT4+NU5+GkUdYYEMCAhvIgIZEMiAhtAhtDY6A0obNHZEE5UePaYa+645hdLNybdcVI2s00X7U0efl6rahPaQHAghwBB3giYOSu4njHGGLqiaZmJyzXrxo9btLGz2c9kyiPmxm8GV7hkPmQo+pu9nR4ZlP6O0vb3o44jxn4+6rVTteIbQIYEMCGBDeRDeRDIhkQyICG0CHoLwF6YEMCAhvIgIZEMiAhtAhtAhgQw77yf6W7THQHH0mCbMYc729xPuOCstFd4x1J8mc6Y0vVqi9Hnn1/t2CnKRwPlJJ87Zxs82+WZcJ8Gqt137qWj6E4dnc4c4ceoK72gQwIYEMCG8iG8iGRDIhkQENoENoEMCGBDAgIbyICGRDIgIbQIbQIYEMCGG71LJFugS/wCSeXm3Lvpf/LTw/wB4IHScR3Wvjt+YWmrlkHP66aINoggsE4kMlzRtc0j0mjEyB7lG1VntKeMZhZdGauLF3hVirwnblKsSJZ81VQ1noIYEMCG8iG8iGRDIhkQENoENoEMCGBDAgIbyICGRDIgIbQIbQIYEMCGBB3Pk/wBDubO0vBE29mGDuNX98gB34Kw0VqY/XP2Z/pjVxVws0+s/Hy7ZWChYk+9Bp9K6tWWOS57CIhq5h7DjmKHMhcLmmt3J4zHinafpC/Yjq0zxjlPj/bXHUSyD9S0fHD8C5dxt85SfrV/lT7T8n3EslTEtHxw/AncbfOT61f5U+0/J9xLJUxLR8cPwJ3G3zk+tX+VPtPyDUSyf5LR8cPwJ3G3zk+tX+VPtPyDUSyH9S0S/nDv/APCdxt85PrV/lT7T8g1Fsh/UtEv5w/AncbfOT61f5U+0/J9xbJ/ktHxw/AncbfOT61f5U+0/J9xbJQRLR8cPwJ3G3zk+tX+VPtPyHUWyUES0fHD8Cdxt85PrV/lT7T8h1Fsn+S0T/nD8Cdxt85PrV/lT7T8h1Fsg/UtE/wCcPwJ3G3zk+tX+VPtPyHUSyD9S0fHD8Cdxt85PrV/lT7T8n3EslTEtHxw/AncbfOT61f5U+0/J9xLJUxLR8cPwJ3G3zk+tX+VPtPyDUSyf5LR8cPwJ3G3zk+tX+VPtPyDUSyH9S0S/nD8Cdxt85PrV/lT7T8g1Fsh/UtEv5w/AncbfOT61f5U+0/J9xbIf1LR8cPwJ3G3zk+tX+VPtPyfcWyUES0fHD8Cdxt85PrV/lT7T8h1FslBEtHxw/AncbfOT61f5U+0/IdRbJ/ktE/5w/AncbfOT61f5U+0/IdRbIP1LRP8AnD8Cdxt85PrV/lT7T8h1Esg/UtHxw/AncbfOT61f5U+0/J9xLJUxLR8cPwJ3G3zk+tX+VPtPy+mw6n2OGQ4te8i8eccHAf8AUAA94K+6NJbpnjn1crvSuouRw4xT6f6W/aPdsCkq1lNAKCAJX7UADaeiABtKBKdUCU8uKAb8uKAd2xAO4IFLggUpVAlLEoAEr9qABtKABtPRAlOqBKeXFAN+XFAO7YgHcEDAIFKV5qgSliUACWaABtKABtPRAlO8oFckGSCEBAQCgkoCAggIAQEEoIQEBAKAUEoCAEEBAQEBAQEEoIKCUEIP/9k=',
        type: 'basic'
    });
}

function sendFile(arrayBuffer, id) {
    console.log("Sending...")
    var xhr = new XMLHttpRequest();
    var blob = new Blob([arrayBuffer])
    path = "http://ec2-18-220-49-88.us-east-2.compute.amazonaws.com/analyze"

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
        //    console.log(xhr.responseText)
            console.log(JSON.stringify(xhr.responseText))
            if (xhr.responseText == "unsafe") {
                notify()
                chrome.downloads.cancel(id)
            } else {
                chrome.downloads.resume(id)
            }
        }
    };
    xhr.open("POST", path, true);

    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(blob);
}