import { useEffect} from 'react';
import SmoothScrollbar from 'smooth-scrollbar';
import { ScrollbarPlugin } from 'smooth-scrollbar';




const Scroll = () => {
  

  useEffect(() => {


        /* 01. Detect Type of Browser */
        var browser = (function (e) {
          switch (!0) {
              case e.indexOf('edge') > -1:
                  return 'edge';
              case e.indexOf('edg') > -1:
                  return 'edg';
              case e.indexOf('opr') > -1 && !!window.opr:
                  return 'opera';
              case e.indexOf('chrome') > -1 && !!window.chrome:
                  return 'chrome';
              case e.indexOf('trident') > -1:
                  return 'ie';
              case e.indexOf('firefox') > -1:
                  return 'firefox';
              case e.indexOf('safari') > -1:
                  return 'safari';
              default:
                  return 'other';
          }
        })(window.navigator.userAgent.toLowerCase());
      if ('edg' === browser || 'safari' === browser) var deltaxspeed = 1.15;
      else deltaxspeed = 2.35;





        /* 02. Increase SmoothScrollbar Speed Based on Browser Type */
        class ScaleDeltaPlugin extends ScrollbarPlugin {
          static pluginName = 'scaleDelta';
          transformDelta(delta, fromEvent) {
            return {
              x: delta.x * deltaxspeed,
              y: delta.y * deltaxspeed,
            };
          }
        }
        SmoothScrollbar.use(ScaleDeltaPlugin);



        




        /* 03. Init SmoothScrollbar */
        const options = {alwaysShowTracks: true,damping: 0.085, renderByPixel: !0, continuousScrolling: !0};
        const s = SmoothScrollbar.init(document.querySelector('.ev-dapp'), options);
    


        /* 04. Add SmoothScrollbar Listener Function */
        s.addListener(function (status) {
          status.offset.y > 50 ? document.querySelector('.navbar').classList.add('is-scrolling') : document.querySelector('.navbar').classList.remove('is-scrolling');
      });


      return () => {
        if (SmoothScrollbar) SmoothScrollbar.destroy(document.querySelector('.ev-dapp'));
      };  










    
  }, []);
  return null;
};

export default Scroll;
