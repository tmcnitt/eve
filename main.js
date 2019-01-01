import Pool from './Pool.js'

let pool = new Pool("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,_0123456789 ", "HELLO MY NAME IS eve TEST TEST 2017", .50, .30,150, 2000)

//Different test strings
//let pool = new Pool("0123456789.", [1,2,3,4,5])
//let pool = new Pool("01", 100)
//let pool = new Pool("01", "001110001101010100101010100100111100101010011")
//let pool = new Pool("0123456789., ", '.1004 .2 .3185 .9865')

pool.solve()
