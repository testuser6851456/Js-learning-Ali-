titles.forEach(function (item) {
        if(item.textContent.length < 70) {
            return;
        } else {
            //const str = `${item.textContent.slice(0, 71)}...`;
            const str = item.textContent.slice(0, 71) + '...';
            item.textContent = str;
        }

    });