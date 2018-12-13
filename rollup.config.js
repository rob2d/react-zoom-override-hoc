import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel' 
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

// rollup.config.js
const config = {
    input: 'src/withZoomOverride.js',
    external: ['react', 'react-dom'],
    output: {
        format: 'umd',
        name: 'react-formication',
        globals: {
            react: 'React',
            'mouse-wheel': 'addMouseWheelEvent'
        }
    },
    plugins : [  
        babel({
            exclude: "node_modules/**"
        }),
        uglify(),
        resolve(),
        commonjs()
    ]
};

export default config