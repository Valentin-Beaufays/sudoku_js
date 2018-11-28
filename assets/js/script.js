    
let grid=[];

//principal function
function mainFunction(){
    grid=[];
    getGrid();

    if(checkInput()){
        
    }
    else{
        alert("La valeur est incorrecte");
    }

    solver();

    for(let i=0;i<9;i++){
        console.log(grid[i]);
    }
}

//function who import the grid from HTML to the grid array
function getGrid(){

    let sudoku=document.getElementById("sudoku");
    let line=[];

    for(let i=0;i<9;i++){
        line=[];
        for(let j=0;j<9;j++){
            line.push(Number(sudoku.rows[i].cells[j].children[0].value));
        }
        grid.push(line);
    }
}

//check if numbers in grid are between 0 and 9
function checkInput(){

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(grid[i][j]<0||grid[i][j]>9){
                return false;
            }
        }
    }
    return true;
}

//check if line is correct
function checkLine(){
    
    //init value array
    let value=[];
    for(let k=0;k<9;k++){
        value.push(false);
    }

    //verification
    for(let i=0;i<9;i++){
        for(let k=0;k<9;k++){
            value[k]=false;
        }
        for(let j=0;j<9;j++){
            if(grid[i][j]!=0){
                if(value[ grid[i][j]-1 ]){
                    return false;
                }
                else{
                    value[ grid[i][j]-1 ]=true;
                }
            }
        }
    }
    return true;
}

//check if column is correct
function checkColumn(){

    //init value array
    let value=[];
    for(let k=0;k<9;k++){
        value.push(false);
    }

    for(let j=0;j<9;j++){
        for(let k=0;k<9;k++){
            value[k]=false;
        }
        for(let i=0;i<9;i++){
            if(grid[i][j]!=0){
                if(value[ grid[i][j]-1 ]){
                    return false;
                }
                else{
                    value[ grid[i][j]-1 ]=true;
                }
            }
        }
    }
    return true;
}

//check if square is correct
function checkSquare(){

    //init value array
    let value=[];

    for(let k=0;k<9;k++){
        value.push(false);
    }

    for(let i=0;i<9;i=i+3){
        for(let j=0;j<9;j=j+3){

            for(let k=0;k<9;k++){
                value[k]=false;
            }
            
            for(let l=0;l<3;l++){
                for(let m=0;m<3;m++){
                    if(grid[i+l][j+m]!=0){
                        if( value[grid[i+l][j+m]-1]){
                            return false;
                        }
                        else{
                            value[ grid[i+l][j+m]-1 ]=true;
                        }
                    }
                }
            }
        }
    }
    return true;
}

//use function to determine if grid is possible or not
function possible(){
    if(checkLine()&&checkColumn()&&checkSquare()){
        return true;
    }
    else{
        return false;
    }
}

function solver(){
    let test=1;
    let baseGrid=[];
    let line =[];

    //copy grid in the base model
    for(let n=0;n<9;n++){
        for(let k=0;k<9;k++){
            line.push(grid[n][k]);
        }
        baseGrid.push(line);
        line = [];
    }

    //solving algorythm
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if( baseGrid[i][j]==0 ){
                test=1;
                do{
                    grid[i][j]=test;
                    
                    if(!possible()){
                        do{
                            if(test<9){
                                test++;
                            }
                            else if(test>=9){
                                grid[i][j]=0;
                                do{
                                    if(j>0){
                                        j--;
                                    }
                                    else{
                                        j=8;
                                        i--;
                                    }

                                }while( baseGrid[i][j]!=0 );
                                
                                test=(grid[i][j])+1; 
                                grid[i][j]=test;
                            }
                        }while(test>=10);
                    }
                }while( !possible() );
            }
        }
    }
}