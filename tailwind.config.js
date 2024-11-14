/** @type {import('tailwindcss').Config} */
export default {
  // 手动切换主题色
  darkMode: 'class',
  // 应用到哪些文件下
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 自定义主题
  theme: {
    extend: {
      fontSize: {
        // [字体大小，行高]
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem'],
        '2xl': ['0.75rem', '0.85rem'],
        '3xl': ['0.85rem', '0.95rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b'
      },
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)'
      },
      colors: {
        main: '#ff4d4f',
        'hover-main': '#ff7875',
        primary: '#1677ff',
        'hover-primary': '#4096ff',
        success: '#52c41a',
        'hover-success': '#73d13d',
        warning: '#faad14',
        'hover-warning': '#ffc53d',
        error: '#f5222d',
        'hover-error': '#f75959',
        info: '#1890ff',
        // message
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      },

      // 毛玻璃效果
      backdropBlur: {
        '4xl': '240px'
      },

      // scrollbar
      variants: {
        scrollbar: ['dark']
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
