  var oInput = document.getElementById('input');
  var oNow = document.getElementsByClassName('now')[0];
  var oWarn = document.getElementsByClassName('warn')[0];
  var oUl = document.getElementsByClassName('list')[0];

  oInput.oninput = function () {
      var oScript = document.createElement('script');
      oScript.src = 'http://wthrcdn.etouch.cn/weather_mini?city=' + this.value + '&callback=ds';
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);
  }

  function ds(data) {
      var value = data.data;
      if (value) {
          var city = value.city;
          var wendu = value.wendu;
          var str = '';
          str = '<p>当前城市为:</p><div class="city">' + city + '</div>' +
              '<p class="right">当前温度为:</p><div class="wendu">' + wendu + '℃</div>';
          oNow.innerHTML = str;
          oNow.style.display = 'block';
          oWarn.innerHTML = '温馨提示:<p>' + value.ganmao + '</p>';
          oWarn.style.display = 'block';
          var forecast = value.forecast;
          var arr = Array.prototype.slice.call(forecast, 0);
          var wet = '';
          arr.forEach(function (ele, index) {
              wet += '<li><h2 style=text-align:center">' + ele.date + '</h2><br><h3>' + ele.type +
                  '</h3><div class="left">' + ele.high + '</div><div class="right">' + ele.low +
                  '</div><div class="mid">' + ele.fengxiang + '</div></li>';
          })
          oUl.innerHTML = wet;
          for (var i = 0; i < 5; i++) {
              var oLi = document.getElementsByTagName('li')[i];
              var oH = document.getElementsByTagName('h3')[i].innerHTML;
              var im = bgImg(oH);
              oLi.style.backgroundImage = 'url(image/' + im + ')';
          }
          oUl.style.display = 'block';
      }
  }

  function bgImg(tar) {
      var src;
      switch (tar) {
          case '多云':
              src = '6.jpg';
              break;
          case '中雨':
              src = '7.jpg';
              break
          case '大雨':
              src = '8.jpg';
              break;
          case '雷阵雨':
              src = '9.jpg';
              break;
          case '晴':
              src = '10.jpg';
              break;
          case '阴':
              src = '11.jpg';
              break;
          case '小雨':
              src = '12.jpg';
              break;
          case '暴雨':
              src = '13.jpg';
              break;
          default:
              src = '15.jpg';
      }
      return src;
  }