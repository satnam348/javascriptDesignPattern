// import { Injectable } from '@angular/core';
// import { AdMobFree, AdMobFreeInterstitialConfig ,AdMobFreeBannerConfig } from '@ionic-native/admob-free';

// @Injectable()
// export class AdsSericeProvider {

//   constructor( private admobFree : AdMobFree) { }
//   showInterstitialAd(){
//     const interstitialConfig: AdMobFreeInterstitialConfig= {
//       id: 'ca-app-pub-8213425045945298/8953834325',
//       isTesting: false,
//       autoShow: true
//     };
//     this.admobFree.interstitial.config(interstitialConfig);

//     this.admobFree.interstitial.prepare()
//     .then(() => {
//       this.admobFree.interstitial.show();
//     })
//     .catch(e => console.log(e));
//     }
//     showAdmobBannerAds() {
//       const bannerConfig: AdMobFreeBannerConfig = {
//         id: "ca-app-pub-8213425045945298/6249679746",
//         isTesting: false,
//         autoShow: true
//       };
//       this.admobFree.banner.config(bannerConfig);

//       this.admobFree.banner
//         .prepare()
//         .then(() => {
//           this.admobFree.banner.show();
//         })
//         .catch(e => console.log(e));
//     }
//     removeBanner(){
//       this.admobFree.banner.hide();
//     }
// }
