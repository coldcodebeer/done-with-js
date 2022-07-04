// Promise.all
// https://www.aleksandrhovhannisyan.com/blog/javascript-promise-all/

const wait = (delaySeconds) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), delaySeconds * 1000);
    });
};

const uploadFile = async (delay, index) => {
    await wait(delay);
    console.log(`uploaded file ${index + 1}`);
};

const promiseAll = (promises) => {
    const resolvedValues = [];
    let promiseCount = 0;

    for (const p of promises) {
        promiseCount++;
    }

    return new Promise((resolve, reject) => {
        if (promiseCount === 0) {
            resolve([]);
            return;
        }

        for (const promise of promises) {
            promise
                .then((value) => {
                    resolvedValues.push(value);

                    if (resolvedValues.length === promiseCount) {
                        resolve(resolvedValues);
                    }
                })
                .catch((e) => {
                    reject(e);
                });
        }
    });
};

const uploadFiles = async (files) => {
    try {
        const fileUploads = files.map((delay, i) => uploadFile(delay, i));
        await promiseAll(fileUploads);
        console.log('all files uploaded');
    } catch (e) {
        console.log('some files failed to upload');
    }
};

uploadFiles([2, 4, 1]);
