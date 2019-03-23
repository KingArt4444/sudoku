module.exports = function solveSudoku(matrix) {
  solut = matrix;
    solveR(solut, 0, 0);
    return solut;
}

function solveR(solut, row, col) {
    var cell = findEmpty(solut, row, col);
    row = cell[0];
    col = cell[1];
    if (row == -1) {
        return true;
    }

    for (var num = 1; num <= 9; num++) {

        if ( noConflicts(solut, row, col, num) ) {   
            solut[row][col] = num;

            if ( solveR(solut, row, col) ) {                
                return true;
            }

                    // mark cell as empty (with 0)    
            solut[row][col] = 0;
        }
    }

    // trigger back tracking
    return false;
}


function findEmpty(solut, row, col) {
    var done = false;
    var res = [-1, -1];

    while (!done) {
        if (row == 9) {
            done = true;
        }
        else {
            if (solut[row][col] == 0) {
                res[0] = row;
                res[1] = col;
                done = true;
            }
            else {
                if (col < 8) {
                    col++;
                }
                else {
                    row++;
                    col = 0;
                }
            }
        }
    }

    return res;
}

function noConflicts(solut, row, col, num) {
    return rowCheck(solut, row, num) && columnCheck(solut, col, num) && boxCheck(solut, row, col, num);
}

function rowCheck(solut, row, num) {
    for (var col = 0; col < 9; col++){
        if (solut[row][col] == num){
            return false;
            }
    }
    return true;
}
function columnCheck(solut, col, num) {
    for (var row = 0; row < 9; row++){
    if (solut[row][col] == num){
        return false;
        }
    }
    return true;    
}
function boxCheck(solut, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (solut[row + r][col + c] == num){
                return false;
                }
            }
    }
    return true;
}