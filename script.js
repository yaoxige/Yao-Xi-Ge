// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    initScrollAnimation();
    
    // 初始化技能进度条动画
    initSkillProgress();
    
    // 初始化任务系统交互
    initTaskSystem();
    
    // 初始化联系方式交互
    initContactSystem();
    
    // 初始化视差效果
    initParallax();
});

// 滚动动画
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('visible');
            }
        });
    }
    
    // 初始检查
    checkVisibility();
    
    // 滚动时检查
    window.addEventListener('scroll', checkVisibility);
}

// 技能进度条动画
function initSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillProgress() {
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            const percentage = parseInt(width);
            const levelElement = skillLevels[index];
            
            let currentPercentage = 0;
            const interval = setInterval(() => {
                currentPercentage += 1;
                levelElement.textContent = currentPercentage + '%';
                
                if (currentPercentage >= percentage) {
                    clearInterval(interval);
                }
            }, 15);
        });
    }
    
    // 当技能板块进入视口时执行动画
    const skillSection = document.getElementById('skill-matrix');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillProgress();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillSection);
}

// 任务系统交互
function initTaskSystem() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            // 切换任务详情的显示/隐藏
            const desc = this.querySelector('.task-desc');
            if (desc) {
                desc.classList.toggle('visible');
            }
        });
    });
}

// 联系方式交互
function initContactSystem() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        // 鼠标悬停效果
        item.addEventListener('mouseenter', function() {
            // 添加电子电流效果
            this.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        // 点击效果
        item.addEventListener('click', function(e) {
            // 如果是邮箱显示，复制邮箱地址
            if (this.classList.contains('email-display')) {
                const emailElement = this.querySelector('.email-address');
                if (emailElement) {
                    navigator.clipboard.writeText(emailElement.textContent).then(() => {
                        alert('邮箱地址已复制到剪贴板！');
                    }).catch(err => {
                        console.error('复制失败:', err);
                    });
                }
                return;
            }
            
            // 获取链接地址
            const href = this.getAttribute('href');
            
            // 如果是QQ，弹出二维码
            if (this.classList.contains('qq-contact')) {
                e.preventDefault();
                const qrModal = document.getElementById('qq-qr-modal');
                qrModal.style.display = 'flex';
            }
            // 如果是微信，弹出二维码
            else if (this.classList.contains('wechat-contact')) {
                e.preventDefault();
                const qrModal = document.getElementById('wechat-qr-modal');
                qrModal.style.display = 'flex';
            }
            // 如果是其他链接，在新窗口打开
            else if (href !== '#') {
                e.preventDefault();
                window.open(href, '_blank');
            }
        });
    });
    
    // 关闭二维码弹窗
    const qrCloseButtons = document.querySelectorAll('.qr-close');
    
    qrCloseButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.qr-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // 点击弹窗外部关闭
    const qrModals = document.querySelectorAll('.qr-modal');
    qrModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// 视差效果
function initParallax() {
    const header = document.getElementById('cyber-header');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        header.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
}

// 故障艺术效果增强
function initGlitchEffect() {
    const cyberName = document.querySelector('.cyber-name');
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            cyberName.style.textShadow = '2px 0 0 var(--neon-pink), -2px 0 0 var(--neon-blue)';
            setTimeout(() => {
                cyberName.style.textShadow = '0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink), 0 0 30px var(--neon-pink)';
            }, 100);
        }
    }, 1000);
}

// 初始化故障艺术效果
initGlitchEffect();

// 数字跳动动画函数
function animateNumber(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateNumber() {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            return;
        }
        element.textContent = Math.round(start);
        requestAnimationFrame(updateNumber);
    }
    
    updateNumber();
}

// 为任务进度添加动画
function animateTaskProgress() {
    const progressFills = document.querySelectorAll('.progress-fill');
    const progressTexts = document.querySelectorAll('.task-progress span');
    
    progressFills.forEach((fill, index) => {
        const width = fill.style.width;
        const percentage = parseInt(width);
        const textElement = progressTexts[index];
        
        if (textElement) {
            animateNumber(textElement, percentage);
        }
    });
}

// 当任务板块进入视口时执行动画
const taskSection = document.getElementById('task-system');
const taskObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTaskProgress();
            taskObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

taskObserver.observe(taskSection);

// 兴趣卡片旋转效果
function initInterestCards() {
    const interestCards = document.querySelectorAll('.interest-card');
    
    interestCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'rotateY(360deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'rotateY(0deg) scale(1)';
            }, 1000);
        });
    });
}

// 初始化兴趣卡片
initInterestCards();

// 时间轴节点动画
function initTimelineNodes() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    
    timelineNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = 'pulse 2s infinite';
        }, index * 500);
    });
}

// 初始化时间轴节点
initTimelineNodes();

// 响应式菜单（如果需要）
function initResponsiveMenu() {
    // 这里可以添加响应式菜单的代码
    // 例如在移动设备上显示汉堡菜单
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 优化滚动事件
window.addEventListener('scroll', throttle(function() {
    // 滚动时的操作
}, 16)); // 约60fps
