/*
 * @Descripttion : 
 * @version      : 
 * @Author       : luoawai
 * @Date         : 2020-11-23 14:51:00
 * @LastEditors  : luoawai
 * @LastEditTime : 2020-11-27 11:46:10
 * @FilePath     : \src\reportWebVitals.ts
 */
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

export default reportWebVitals;
