function DETECT(){
    var platform, app, agent, device,
        flash, browser, bVersion, os, osVersion, cssPrefix, stylePrefix, transform3D,
        b, bStyle, div, keyframe,
        v, a, c;
    agent = navigator.userAgent.toLowerCase(),
    platform = navigator.platform.toLowerCase(),
    app = navigator.appVersion.toLowerCase(),
    flash = 0, device = 'pc',
    (function(){
        var i;
        function ie(){
            if( agent.indexOf( 'msie' ) < 0 && agent.indexOf( 'trident' ) < 0 ) return;
            if( agent.indexOf( 'iemobile' ) > -1 ) os = 'winMobile';
            return browser = 'ie', bVersion = agent.indexOf( 'msie' ) < 0 ? 11 : parseFloat( /msie ([\d]+)/.exec( agent )[1] );
        }
        function chrome(){
            var i;
            if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
            return browser = 'chrome', bVersion = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/ ).exec( agent )[1] );
        }
        function firefox(){
            if( agent.indexOf( 'firefox' ) < 0 ) return;
            return browser = 'firefox', bVersion = parseFloat( /firefox\/([\d]+)/.exec( agent )[1] );
        }
        function safari(){
            if( agent.indexOf( 'safari' ) < 0 ) return;
            return browser = 'safari', bVersion = parseFloat( /safari\/([\d]+)/.exec( agent )[1] );
        }
        function opera(){
            if( agent.indexOf( 'opera' ) < 0 ) return;
            return browser = 'opera', bVersion = parseFloat( /version\/([\d]+)/.exec( agent )[1] );
        }
        function naver(){if( agent.indexOf( 'naver' ) > -1 ) return browser = 'naver';}
        if( agent.indexOf( 'android' ) > -1 ){
            browser = os = 'android';
            if( agent.indexOf( 'mobile' ) == -1 ) browser += 'Tablet', device = 'tablet';
            else device = 'mobile';
            i = /android ([\d.]+)/.exec( agent );
            if( i ) i = i[1].split('.'), osVersion = parseFloat( i[0] + '.' + i[1] );
            else osVersion = 0;
            i = /safari\/([\d.]+)/.exec( agent );
            if( i ) bVersion = parseFloat( i[1] );
            naver() || chrome() || firefox() || opera();
        }else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
            device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i;
            if( i = /os ([\d_]+)/.exec( agent ) ) i = i[1].split('_'), osVersion = parseFloat( i[0] + '.' + i[1] );
            else osVersion = 0;
            if( i = /mobile\/10a([\d]+)/.exec( agent ) ) bVersion = parseFloat( i[1] );
            naver() || chrome() || firefox() || opera();
        }else{
            (function(){
                var plug, t0, e;
                plug = navigator.plugins;
                if( browser == 'ie' ) try{t0 = new ActiveXObject( 'ShockwaveFlash.ShockwaveFlash' ).GetVariable( 'version' ).substr( 4 ).split( ',' ), flash = parseFloat( t0[0] + '.' + t0[1] );}catch( e ){}
                else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split( ' ' )[2].split( '.' ), flash = parseFloat( t0[0] + '.' + t0[1] );
                else if( agent.indexOf( 'webtv' ) > -1 ) flash = agent.indexOf( 'webtv/2.6' ) > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
            })();
            if( platform.indexOf( 'win' ) > -1 ){
                os = 'win', i = 'windows nt ';
                if( agent.indexOf( i + '5.1' ) > -1 ) osVersion = 'xp';
                else if( agent.indexOf( i + '6.0' ) > -1 ) osVersion = 'vista';
                else if( agent.indexOf( i + '6.1' ) > -1 ) osVersion = '7';
                else if( agent.indexOf( i + '6.2' ) > -1 ) osVersion = '8';
                else if( agent.indexOf( i + '6.3' ) > -1 ) osVersion = '8.1';
                ie() || chrome() || firefox() || safari() || opera();
            }else if( platform.indexOf( 'mac' ) > -1 ){      
                os = 'mac';
                i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.');
                osVersion = parseFloat( i[0] + '.' + i[1] );
                chrome() || firefox() || safari() || opera();
            }else{
                os = app.indexOf( 'x11' ) > -1 ? 'unix' : app.indexOf( 'linux' ) > -1 ? 'linux' : 0;
                chrome() || firefox();
            }
        }
    })(),
    b = doc.body, bStyle = b.style, div = doc.createElement( 'div' ),
    div.innerHTML = '<div style="opacity:.55;position:fixed;top:100px;visibility:hidden;-webkit-overflow-scrolling:touch">a</div>',
    div = div.getElementsByTagName( 'div' )[0],
    c = doc.createElement( 'canvas' ), c = 'getContext' in c ? c : null,
    a = doc.createElement( 'audio' ), a = 'canPlayType' in a ? a : null,
    v = doc.createElement( 'video' ), v = 'canPlayType' in v ? v : null;
    switch( browser ){
    case'ie': cssPrefix = '-ms-', stylePrefix = 'ms'; transform3D = bVersion > 9 ? 1 : 0;
        if( bVersion == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), b.style.position = 'relative';
        break;
    case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz'; transform3D = 1; break;
    case'opera': cssPrefix = '-o-', stylePrefix = 'O'; transform3D = 0; break;
    default: cssPrefix = '-webkit-', stylePrefix = 'webkit'; transform3D = os == 'android' ? ( osVersion < 4 ? 0 : 1 ) : 0;
    }
    if( keyframe = W['CSSRule'] ){
        if( keyframe.WEBKIT_KEYFRAME_RULE ) keyframe = '-webkit-keyframes';
        else if( keyframe.MOZ_KEYFRAME_RULE ) keyframe = '-moz-keyframes';
        else if( keyframe.KEYFRAME_RULE ) keyframe = 'keyframes';
        else keyframe = null;
    }
    return {
        'device':device, 'browser':browser, 'browserVer':bVersion, 'os':os, 'osVer':osVersion, 'flash':flash, 'sony':agent.indexOf( 'sony' ) > -1,
        //dom
        root:b.scrollHeight ? b : doc.documentElement,
        scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page',
        insertBefore:div.insertBefore, png:browser == 'ie' && bVersion > 7, 
        opacity:div.style.opacity == '0.55' ? 1 : 0, text:div.textContent ? 'textContent' : div.innerText ? 'innerText' : 'innerHTML',
        cstyle:doc.defaultView && doc.defaultView.getComputedStyle,
        //css3
        cssPrefix:cssPrefix, stylePrefix:stylePrefix, filterFix:browser == 'ie' && bVersion == 8 ? ';-ms-' : ';',
        transition:stylePrefix + 'Transition' in bStyle || 'transition' in bStyle, transform3D:transform3D, keyframe:keyframe,
        //html5
        canvas:c, canvasText:c && c.getContext('2d').fillText,
        audio:a,
        audioMp3:a && a.canPlayType('audio/mpeg;').indexOf('no') < 0 ? 1 : 0,
        audioOgg:a && a.canPlayType('audio/ogg;').indexOf('no') < 0 ? 1 : 0,
        audioWav:a && a.canPlayType('audio/wav;').indexOf('no') < 0 ? 1 : 0,
        audioMp4:a && a.canPlayType('audio/mp4;').indexOf('no') < 0 ? 1 : 0,
        video:v,
        videoCaption:'track' in doc.createElement('track') ? 1 : 0,
        videoPoster:v && 'poster' in v ? 1 : 0,
        videoWebm:v && v.canPlayType( 'video/webm; codecs="vp8,mp4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        videH264:v && v.canPlayType( 'video/mp4; codecs="avc1.42E01E,m4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        videoTeora:v && v.canPlayType( 'video/ogg; codecs="theora,vorbis"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        local:W.localStorage && 'setItem' in localStorage,
        geo:navigator.geolocation, worker:W.Worker, file:W.FileReader, message:W.postMessage,
        history:'pushState' in history, offline:W.applicationCache,
        db:W.openDatabase, socket:W.WebSocket
    };
}