var data=null,//����4X4�����ݵĶ�ά����
    RN=4,CN= 4,//������������������
    score=0,//�������
    status=0,//������Ϸ״̬���
    //Ϊ��Ϸ״̬�������
    GAMEOVER=0,RUNNING=1;
//������Ϸ
function start(){
    //��ʼ����Ϸ״̬Ϊ������
    status=RUNNING;
    score=0;
    //��data��ʼ��Ϊ4X4��0�Ķ�ά����
    data=[];
    for(var r=0; r<RN;r++){
        data.push([]);
        for(var c=0;c<CN;c++)
        data[r][c]=0;
    }
//����2�������
randomNum(); randomNum();
    //����ҳ��
    updateView();
    //Ϊҳ��󶨼��̰����¼�������
    //--�ص�����
    document.onkeydown=function(e){
        //�жϼ��̺�
        switch(e.keyCode){
            case 37://��
                moveLeft();
                break;
            case 38://��
                moveUp();
                break;
            case 39://��
                moveRight();
                break;
            case 40://��
                moveDown();
                break;
        }
    }
}
//���λ��������
function randomNum(){
    while(true){//����:
        //�������0��RN-1�к�r
        var r=parseInt(Math.random()*RN);
        //�������0~CN-1�к�c
        var c=parseInt(Math.random()*RN);
        //���data��r��c�е�ֵΪ0
        if(data[r][c]==0){
            //��data��r��c�и�ֵһ��2��4
            data[r][c]=Math.random()<0.5?2:4;
            break;//�˳�ѭ��
        }
    }
}
//���������ݸ��µ�ҳ��div��
function updateView(){
    for(var r=0;r<RN;r++)//����data
        for(var c=0;c<CN;c++){
            //���Һ�rcλ�ö�Ӧ��div
            var div=document.getElementById("c"+r+c);
            //�����ǰԪ��ֵ��Ϊ0
            if(data[r][c]!=0){
                //����div������Ϊ��ǰԪ��ֵ
                div.innerHTML=data[r][c];
                //��div��class��׷�� ��n����
                div.className="cell n"+data[r][c];
            }else{
                //���div�еĲ�������
                div.innerHTML="";
                //�ָ�classΪcell
                div.className="cell";
            }
        }
    //��score���µ�IDΪscore��span��
    var span= document.getElementById("score");
    span.innerHTML=score;
    //�ҵ�idΪgameover��div
    var div=document.getElementById("gameover");
    if(status==GAMEOVER){
        div.style.display="block";
        document.getElementById("final").innerHTML=score;
    }else
    div.style.display="none";
}
//����������
function moveLeft(){
    //Ϊdata���ձ�����before��
    var before=String(data);
    //����data��ÿһ��
    for(var r=0;r<RN;r++){
        //���Ƶ�r��
        moveLeftInRow(r);
    }//��������
    //Ϊdata���ձ�����after��
    var after=String(data);
    //���before��=after
    if(before!=after){
        randomNum();//���������
        if(isGAMEOVER())//�����Ϸ����
        //���޸���Ϸ״̬ΪGAMEOVER
            status=GAMEOVER;
        updateView();//���½���
    }
}
//�ж���Ϸ����
function isGAMEOVER(){
    //����data��ÿ��Ԫ��
    for(var r=0;r<RN;r++){
        for(var c=0;c<CN;c++){
            //�����ǰԪ����0
            if(data[r][c]==0)
                return false;//����false
            //�������c<CN-1�ҵ�ǰԪ�ص����Ҳ�Ԫ��
            else if(c<CN-1
                &&data[r][c]==data[r][c+1])
                return false;//����false
            //�������r<RN-1�ҵ�ǰԪ�ص����·�Ԫ��
            else if(r<RN-1
                &&data[r][c]==data[r+1][c])
                return false;//����false
        }
    }//(��������)
    return true;//����true
}
//ר���ƶ���r��
function moveLeftInRow(r){
    //c��0��ʼ����data��r��ÿ���񣬵�<CN-1����
    for(var c=0;c<CN-1;c++){
        //����cλ���Ҳ���һ����Ϊ0��λ��nextc
        var nextc=getNextInRow(r,c);
        if(nextc!=-1){//�����ҵ�
            //���cλ�õ�ֵΪ0
                if(data[r][c]==0){
                    //��nextcλ�õ�ֵ��ֵ��cλ��
                    data[r][c]=data[r][nextc];
                    //��nextcλ�õ�ֵ��Ϊ0
                    data[r][nextc]=0;
                    c--;//c����ԭ��
                }else if(data[r][c]==data[r][nextc]){
                    //�������cλ�õ�ֵ����nextcλ�õ�ֵ
                    data[r][c]*=2;
                    //���ϲ�����ֵ�ۼӵ�score
                    score+=data[r][c];
                    data[r][nextc]=0;
                }
            }else break;
        }
    }
function getNextInRow(r,c){
        for(var nextc=c+1;nextc<CN;nextc++){
            if(data[r][nextc]!=0)
            return nextc;
        }
        return -1;
}
//����������
function moveRight(){
    var before=String(data);
    for(var r=0;r<RN;r++){
        moveRightInRow(r);
    }
    var after=String(data);
    if(before!=after){
        randomNum();
        if(isGAMEOVER())//�����Ϸ����
        //���޸���Ϸ״̬ΪGAMEOVER
            status=GAMEOVER;
        updateView();
    }
}
//ר���ƶ���r��
function moveRightInRow(r){
    for(var c=CN-1;c>0;c--){
        var prevc=getPrevInRow(r,c);
        if(prevc!=-1){
            if(data[r][c]==0){
                data[r][c]=data[r][prevc];
                data[r][prevc]=0;
                c++;
            }else if(data[r][c]==data[r][prevc]){
                data[r][c]*=2;
                //���ϲ�����ֵ�ۼӵ�score
                score+=data[r][c];
                data[r][prevc]=0;
            }
        }else break;
    }
}
function getPrevInRow(r,c){
    for(var prevc=c-1;prevc>=0;prevc--){
        if(data[r][prevc]!=0)
        return prevc;
    }
    return -1;
}

//����
function moveUp(){
    //Ϊdata���ձ�����before��
    var before=String(data);
    //����data��ÿһ��
    for(var c=0;c<CN;c++){
        //���Ƶ�r��
        moveUpInCol(c);
    }//��������
    //Ϊdata���ձ�����after��
    var after=String(data);
    //���before��=after
    if(before!=after){
        randomNum();//���������
        if(isGAMEOVER())//�����Ϸ����
        //���޸���Ϸ״̬ΪGAMEOVER
            status=GAMEOVER;
        updateView();//���½���
    }
}
//ר���ƶ���r��
function moveUpInCol(c){
    //r��0��ʼ����data��c��ÿ���񣬵�<RN-1����
    for(var r=0;r<RN-1;r++){
        //����rλ���²���һ����Ϊ0��λ��nextr
        var nextr=getNextInCol(r,c);
        if(nextr!=-1){//�����ҵ�
            //���rλ�õ�ֵΪ0
            if(data[r][c]==0){
                //��nextcλ�õ�ֵ��ֵ��cλ��
                data[r][c]=data[nextr][c];
                //��nextcλ�õ�ֵ��Ϊ0
                data[nextr][c]=0;
                r--;//c����ԭ��
            }else if(data[r][c]==data[nextr][c]){
                //�������cλ�õ�ֵ����nextcλ�õ�ֵ
                data[r][c]*=2;
                //���ϲ�����ֵ�ۼӵ�score
                score+=data[r][c];
                data[nextr][c]=0;
            }
        }else break;
    }
}
function getNextInCol(r,c){
    for(var nextr=r+1;nextr<RN;nextr++){
        if(data[nextr][c]!=0)
            return nextr;
    }
    return -1;
}
//����
function moveDown(){
    //Ϊdata���ձ�����before��
    var before=String(data);
    //����data��ÿһ��
    for(var c=0;c<CN;c++){
        //���Ƶ�r��
        moveDownInCol(c);
    }//��������
    //Ϊdata���ձ�����after��
    var after=String(data);
    //���before��=after
    if(before!=after){
        randomNum();//���������
        if(isGAMEOVER())//�����Ϸ����
        //���޸���Ϸ״̬ΪGAMEOVER
            status=GAMEOVER;
        updateView();//���½���
    }
}
//ר���ƶ���r��
function moveDownInCol(c){
    //r��0��ʼ����data��c��ÿ���񣬵�<RN-1����
    for(var r=RN-1;r>0;r--){
        //����rλ���²���һ����Ϊ0��λ��nextr
        var prevr=getPrevInCol(r,c);
        if(prevr!=-1){//�����ҵ�
            //���rλ�õ�ֵΪ0
            if(data[r][c]==0){
                //��nextcλ�õ�ֵ��ֵ��cλ��
                data[r][c]=data[prevr][c];
                //��nextcλ�õ�ֵ��Ϊ0
                data[prevr][c]=0;
                r++;//c����ԭ��
            }else if(data[r][c]==data[prevr][c]){
                //�������cλ�õ�ֵ����nextcλ�õ�ֵ
                data[r][c]*=2;
                //���ϲ�����ֵ�ۼӵ�score
                score+=data[r][c];
                data[prevr][c]=0;
            }
        }else break;
    }
}
function getPrevInCol(r,c){
    for(var prevr=r-1;prevr>=0;prevr--){
        if(data[prevr][c]!=0)
            return prevr;
    }
    return -1;
}
start();