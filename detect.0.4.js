var bs = bs || {};

( function(){
    var detectWindow, detectDOM;
    detectWindow = function( W, detect ){
        var navi = W['navigator'], agent = navi.userAgent.toLowerCase(),
            platform = navi.platform.toLowerCase(),
            app = navi.appVersion.toLowerCase(),
            flash = 0, device = 'pc', browser, bv, os, osv, i, t0,
            ie = function(){
                if( agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0 ) return;
                if( agent.indexOf('iemobile') > -1 ) os = 'winMobile';
                return browser = 'ie', bv = agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
            },
            chrome = function(){
                if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
                return browser = 'chrome', bv = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/ ).exec(agent)[1] );
            },
            firefox = function(){return agent.indexOf('firefox') < 0 ? 0 : browser = 'firefox', bv = parseFloat( /firefox\/([\d]+)/.exec(agent)[1] );},
            safari = function(){return agent.indexOf('safari') < 0 ? 0 : browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]);},
            opera = function(){return agent.indexOf('opera') < 0 ? 0 : browser = 'opera', bv = parseFloat( /version\/([\d]+)/.exec(agent)[1] );},
            naver = function(){return agent.indexOf( 'naver' ) < 0 ? 0 : browser = 'naver';};

        if( !detect ) detect = {};
        if( agent.indexOf('android') > -1 ){
            browser = os = 'android';
            if( agent.indexOf('mobile') == -1 ) browser += 'Tablet', device = 'tablet';
            else device = 'mobile';
            if( i = /android ([\d.]+)/.exec(agent) ) i = i[1].split('.'), osVersion = parseFloat( i[0] + '.' + i[1] );
            else osv = 0;
            if( i = /safari\/([\d.]+)/.exec(agent) ) bv = parseFloat(i[1]);
            naver() || chrome() || firefox() || opera();
        }else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
            device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i;
            if( i = /os ([\d_]+)/.exec(agent) ) i = i[1].split('_'), osVersion = parseFloat( i[0] + '.' + i[1] );
            else osv = 0;
            if( i = /mobile\/([\S]+)/.exec(agent) ) bv = parseFloat(i[1]);
            naver() || chrome() || firefox() || opera();
        }else{
            (function(){
                var plug, t0, e;
                plug = navi.plugins;
                if( browser == 'ie' ) try{t0 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('version').substr(4).split(','), flash = parseFloat( t0[0] + '.' + t0[1] );}catch(e){}
                else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split(' ')[2].split('.'), flash = parseFloat( t0[0] + '.' + t0[1] );
                else if( agent.indexOf('webtv') > -1 ) flash = agent.indexOf('webtv/2.6') > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
            })();
            if( platform.indexOf('win') > -1 ){
                os = 'win', i = 'windows nt ';
                if( agent.indexOf( i + '5.1' ) > -1 ) osv = 'xp';
                else if( agent.indexOf( i + '6.0' ) > -1 ) osv = 'vista';
                else if( agent.indexOf( i + '6.1' ) > -1 ) osv = '7';
                else if( agent.indexOf( i + '6.2' ) > -1 ) osv = '8';
                else if( agent.indexOf( i + '6.3' ) > -1 ) osv = '8.1';
                ie() || chrome() || firefox() || safari() || opera();
            }else if( platform.indexOf('mac') > -1 ){
                os = 'mac',
                    i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.'),
                    osv = parseFloat( i[0] + '.' + i[1] ),
                    chrome() || firefox() || safari() || opera();
            }else{
                os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0,
                    chrome() || firefox();
            }
        }
        for( i in t0 = {
            'device':device, 'browser':browser, 'browserVer':bv, 'os':os, 'osVer':osv, 'flash':flash, 'sony':agent.indexOf('sony') > -1
        } ) if( t0.hasOwnProperty(i) ) detect[i] = t0[i];
        return detect;
    };
    detectDOM = function( W, detect ){
        var doc = W['document'], cssPrefix, stylePrefix, transform3D, keyframe = W['CSSRule'],
            b = doc.body, bStyle = b.style, div = doc.createElement('div'),
            c = doc.createElement('canvas'), a = doc.createElement('audio'), v = doc.createElement('video'), k, t0;

        if( !detect ) detect = {};
        if( !doc ) return detect;
        div.innerHTML = '<div data-test-ok="234">a</div>',
            div = div.getElementsByTagName( 'div' )[0];
        switch( detect.browser ){
            case'ie': cssPrefix = '-ms-', stylePrefix = 'ms'; transform3D = detect.browserVer > 9 ? 1 : 0;
                if( detect.browserVer == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), bStyle.position = 'relative';
                break;
            case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz'; transform3D = 1; break;
            case'opera': cssPrefix = '-o-', stylePrefix = 'O'; transform3D = 1; break;
            default: cssPrefix = '-webkit-', stylePrefix = 'webkit'; transform3D = detect.os == 'android' ? ( detect.osVersion < 4 ? 0 : 1 ) : 1;
        }
        if( keyframe ){
            if( keyframe.WEBKIT_KEYFRAME_RULE ) keyframe = '-webkit-keyframes';
            else if( keyframe.MOZ_KEYFRAME_RULE ) keyframe = '-moz-keyframes';
            else if( keyframe.KEYFRAME_RULE ) keyframe = 'keyframes';
            else keyframe = null;
        }
        for( k in t0 = {
            //dom
            root:b.scrollHeight ? b : doc.documentElement,
            scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page', insertBefore:div.insertBefore,
            text:div.textContent ? 'textContent' : div.innerText ? 'innerText' : 'innerHTML',
            cstyle:doc.defaultView && doc.defaultView.getComputedStyle,
            customData:div.dataset && div.dataset.testOk == '234',
            //css3
            cssPrefix:cssPrefix, stylePrefix:stylePrefix,
            transition:stylePrefix + 'Transition' in bStyle || 'transition' in bStyle, transform3D:transform3D, keyframe:keyframe,
            transform:stylePrefix + 'Transform' in bStyle || 'transform' in bStyle,
            //html5
            canvas:c ? 1 : 0, canvasText:c && c.getContext('2d').fillText,
            audio:a ? 1 : 0,
            audioMp3:a && a.canPlayType('audio/mpeg;').indexOf('no') < 0 ? 1 : 0,
            audioOgg:a && a.canPlayType('audio/ogg;').indexOf('no') < 0 ? 1 : 0,
            audioWav:a && a.canPlayType('audio/wav;').indexOf('no') < 0 ? 1 : 0,
            audioMp4:a && a.canPlayType('audio/mp4;').indexOf('no') < 0 ? 1 : 0,
            video:v ? 1 : 0,
            videoCaption:'track' in doc.createElement('track') ? 1 : 0,
            videoPoster:v && 'poster' in v ? 1 : 0,
            videoWebm:v && v.canPlayType( 'video/webm; codecs="vp8,mp4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
            videH264:v && v.canPlayType( 'video/mp4; codecs="avc1.42E01E,m4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
            videoTeora:v && v.canPlayType( 'video/ogg; codecs="theora,vorbis"' ).indexOf( 'no' ) == -1 ? 1 : 0,
            local:W.localStorage && 'setItem' in localStorage,
            geo:navigator.geolocation, worker:W.Worker, file:W.FileReader, message:W.postMessage,
            history:'pushState' in history, offline:W.applicationCache,
            db:W.openDatabase, socket:W.WebSocket
        } ) if( t0.hasOwnProperty(k) ) detect[k] = t0[k];
        return detect;
    };

    // @test
    bs.detectWindow = detectWindow;
    bs.detectDOM = detectDOM;
} )();