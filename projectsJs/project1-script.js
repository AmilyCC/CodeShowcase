(
        function () {
       
        let model = {
          total: 50,
          items: [  //  建構圖案庫  
            '🍭',
            '🍊',
            '⛄️',
            '🦄',
            '🍌',
            '💩',
            '👻',
            '😻',
            '💵',
            '🤡',    
            '🦖',
            '🍎',
            '😂',
            '🐽',
          ],
          awards: [ //  建構獎項
            {
              name: "一獎",
              amount: 1,
              img: "🍭"
            },{
              name: "二獎",
              amount: 3,
              img: "🍊"
            },{
              name: "三獎",
              amount: 5,
              img: "⛄️"
            }
          ],
          noAwards :"🙊",     //  未中獎確認用
          lottery:false,      //  確認有無抽獎過
          result:"",          //  抽獎結果，若未中獎則為空值
          awardsIndex:0,      //  若中獎會傳入獎項索引
          doors:[],           //  亂數後的拉霸圖案
          duration: 2         //  轉動時間
        }; 
          
        //  定義三個窗格
        const doors = document.querySelectorAll('.door');
        //  定義按鈕
        document.querySelector('#spinner').addEventListener('click', spin);
        document.querySelector('#reseter').addEventListener('click', init);
        //  初始化函式
        function init(firstInit = true, groups = 1, duration = 1) {
          if (!firstInit && !model.lottery) {
            //  第一次點擊開始按鈕
            Lottery(model.total)
            model.lottery = true;
          }else if(!firstInit && model.lottery){
            //  第一次後點擊開始按鈕
            reset(true);
            return
          }else{
            //  點擊重置按鈕
            reset(false);
          }
          for (const door of doors) {
            //  判斷是否已轉過   
            if (firstInit) {
            //  將dataset.sppined設為'0'表示未轉過  
              door.dataset.spinned = '0';  
            //  若dataset.sppined為'1'即返回不動作 
            } else if (door.dataset.spinned === '1') {
              return
            }
            //  定義轉動的箱子
            const boxes = door.querySelector('.boxes');
            //  複製.boxes節點。false是複製該元素;true則會複製所有子代。
            const boxesClone = boxes.cloneNode(false);
            //  定義pool初始值
            const pool = ['❔'];
            //  如果非初次載入
            if (!firstInit) {
              //  定義imgPool陣列
              let imgPool = [];
              //  執行迴圈，確保group一定有值
              for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                imgPool.push(...model.items); //  將item按順序添加到imgPool當中
              }
              // console.log("1",imgPool)
              imgPool = removeImg(model.result,imgPool)
              // console.log("2",imgPool)
              //  將imgPool進行亂數洗牌處理
              pool.push(...shuffle(model.result,model.total,imgPool));
              // console.log("3",pool)
              //  在transition開始時，監聽複製的.boxes節點
              boxesClone.addEventListener('transitionstart', function(){
                  //  dataset.sppined設為'1'表示已轉過  
                  door.dataset.spinned = '1';
                  //  所有的box都加上模糊樣式
                  this.querySelectorAll('.box').forEach((box) => {
                    box.style.filter = 'blur(1px)';
                  });
                },
                { once: true } // 執行一次
              );
              //  在transition結束時，監聽複製的.boxes節點
              boxesClone.addEventListener('transitionend', function () {
                  this.querySelectorAll('.box').forEach((box, index) => {
                    //  所有的box都移除模糊樣式
                    box.style.filter = 'blur(0)';
                    //  移除index為0以外的box
                    if (index > 0) this.removeChild(box);
                  });
                },
                { once: true }
              );
            }
            //  創造box，遍歷轉盤裡的每個圖案
            for (let i = pool.length - 1; i >= 0; i--) {
              const box = document.createElement('div');
              box.classList.add('box'); // 加上class
              box.style.width = door.clientWidth + 'px'; // 加上寬度
              box.style.height = door.clientHeight + 'px'; // 加上高度
              box.textContent = pool[i]; // 加上圖案
              boxesClone.appendChild(box); // 加到clone的boxes裡
            }
            // console.log(boxesClone)
            //  clone的boxes期間設定為dureation或1
            boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
            //  初始的translateY高度為窗格高度*圖案數量
            boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
            //  用boxesClone取代boxes
            door.replaceChild(boxesClone, boxes);
          }
        }
      
        async function spin() {
          // 呼叫 init，false 表示已轉過
          init(false, 1, model.duration);
      
          // 創建一個 Promise，用來等待所有動畫執行完畢
          const mes = new Promise(async (resolve, reject) => {
            try {
              for (const door of doors) {
                // 非同步處理
                await new Promise((innerResolve) => {
                  // 定義轉動的箱子
                  const boxes = door.querySelector('.boxes');
                  // 取得動畫時間，取整數
                  const duration = parseInt(boxes.style.transitionDuration);
                  // 位移動畫設定回原點
                  boxes.style.transform = 'translateY(0)';
                  // dalay 時間設定
                  setTimeout(innerResolve, duration * 110);
                });
              }
              resolve();
            } catch (error) {
              // 如果發生錯誤，拒絕外層的 Promise
              reject(error);
            }
          });
      
          // 在外層的 Promise 解決後執行
          mes
            .then(() => {
              // 在這裡處理 alert，等待 2 秒後執行
              setTimeout(() => {
                if(model.result){
                  alert(`恭喜中${model.awards[model.awardsIndex].name}！！`);
                }
              }, model.duration * 1110);
            })
            .catch((error) => {
              console.warn(error);
            });
        }
      
        
        // 將陣列隨機洗牌
        function shuffle(result,total,arr) {
          for (let m = arr.length; m > 0; m--){
            const n = Math.floor(Math.random() * m--);
            [arr[m], arr[n]] = [arr[n], arr[m]];
          }
          model.doors.push(arr[arr.length-1])
          
          //  如果中獎，將最後項改為結果
          if(result){
            arr.push(result)
          }
          //  若未中獎的情況，三個圖案重複，會將最後一次結果的圖案，以noAwards取代
          else if(!result && (model.doors[0] === model.doors[1] && 
            model.doors[1] === model.doors[2])){
            arr.pop()
            arr.push(model.noAwards)
          }
          return arr;
        }
        //  awardPool獎池 
        function awardsPool(){
          //  定義awardPool獎池陣列
          const awardPool = [];
          //  定義沒獎項的數字
          let noAward = model.total
          for (i=0;i < model.awards.length;i++){      
              let amount = parseInt(Object.values(model.awards[i])[1])
              noAward -= amount
              awardPool.push(amount) 
          }
          awardPool.push(noAward)
          return awardPool
        }
        //  計算獎項頭尾範圍  
        function calRanges(total) {
          const ranges = [];
          let start = 0;
      
          awardsPool().forEach((amount) => {
            const probability = amount / total;
            const end = start + amount - 1;
            ranges.push({ start, end, amount });
            start = end + 1;
          });
      
          return ranges;
        }
        // 抽獎
        function Lottery(total){
           //  產生隨機數
          const randomNum = Math.floor(
            Math.random() * total
          );
          //  比對是否符合其中一獎項
          calRanges(total).forEach(( range , i ) =>{
            if (
              randomNum >= range.start &&
              randomNum <= range.end &&
              awardsPool()[i] > 0
            ){
              if(
                awardsPool()[i] === awardsPool()[awardsPool().length-1]
              ){      //  未中獎時，直接返回
                return
              }else{  //  中獎則，回傳中獎獎項
                model.result = model.awards[i].img;
                model.awardsIndex = i;
                return 
                };
              }
            })
        }
          
        function removeImg(result,arrs){
          arrs = arrs.filter( arr => arr !== result )
          return arrs
        }
        function reset(done){
          model.result = "";
          model.doors = [];
          model.lottery = done ? done : false
          return
        }
        init();
      }
      )();
      
