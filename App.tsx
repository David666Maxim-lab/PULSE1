import { useState } from 'react'
import {
  Home, MessageCircle, Plus, Clapperboard, UserRound, Search, Bell,
  Heart, MessageSquare, Send, Bookmark, MoreHorizontal, ImagePlus,
  Video, FileText, Users, Radio, Settings, Sun, Moon, Sparkles,
  ChevronDown, Play, X, Gift
} from 'lucide-react'

type Tab = 'home' | 'chats' | 'video' | 'profile'
type Theme = 'light' | 'gold' | 'warm'

const stories = [
  { name: 'Ваша история', initials: '+', own: true },
  { name: 'Алина', initials: 'А', tone: 'pink' },
  { name: 'Марк', initials: 'М', tone: 'blue' },
  { name: 'София', initials: 'С', tone: 'violet' },
  { name: 'Даниил', initials: 'Д', tone: 'green' },
  { name: 'Ева', initials: 'Е', tone: 'orange' },
]

const posts = [
  { name: 'Алина Мир', handle: '@alina.m', time: '12 мин. назад', initials: 'А', tone: 'pink', text: 'Иногда лучший план — просто выйти на улицу, вдохнуть воздух и никуда не спешить. ✨', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85', likes: '2,4 тыс.', comments: 128 },
  { name: 'Марк Волков', handle: '@mark.v', time: '1 ч. назад', initials: 'М', tone: 'blue', text: 'Новый день — новая возможность сделать что-то классное. Как проходит ваша неделя?', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85', likes: '846', comments: 46 },
]

const chats = [
  { name: 'Алина Мир', msg: 'Отправила тебе фотографии ✨', time: '12:42', unread: 2, tone: 'pink' },
  { name: 'Друзья 🤍', msg: 'Марк: Кто сегодня гулять?', time: '11:58', unread: 5, tone: 'blue' },
  { name: 'PULSE Новости', msg: 'Добро пожаловать в PULSE!', time: 'Вчера', unread: 0, tone: 'violet' },
]

function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [theme, setTheme] = useState<Theme>('gold')
  const [showCreate, setShowCreate] = useState(false)
  const [liked, setLiked] = useState<number[]>([])
  const [saved, setSaved] = useState<number[]>([])
  const [showThemes, setShowThemes] = useState(false)

  const toggle = (list: number[], setter: (v: number[]) => void, id: number) =>
    setter(list.includes(id) ? list.filter(x => x !== id) : [...list, id])

  return (
    <div className={`app theme-${theme}`}>
      <header className="topbar">
        <div className="brand" onClick={() => setTab('home')} role="button">
          <div className="brand-mark"><span>〰</span><i>✦</i></div>
          <div><div className="brand-name">PULSE</div><div className="brand-sub">СОЦИАЛЬНАЯ СЕТЬ</div></div>
        </div>
        <div className="top-actions">
          <button className="icon-btn" aria-label="Поиск"><Search /></button>
          <button className="icon-btn notification" aria-label="Уведомления"><Bell /><b /></button>
          <button className="theme-switch" onClick={() => setShowThemes(!showThemes)}><Sparkles size={16}/><span>Тема</span><ChevronDown size={14}/></button>
        </div>
        {showThemes && <div className="theme-menu">
          <button onClick={() => {setTheme('light');setShowThemes(false)}}><Sun size={16}/> Светлый минимализм</button>
          <button onClick={() => {setTheme('gold');setShowThemes(false)}}><Sparkles size={16}/> Премиум — чёрный и золото</button>
          <button onClick={() => {setTheme('warm');setShowThemes(false)}}><Moon size={16}/> Уютный</button>
        </div>}
      </header>

      <main className="main">
        {tab === 'home' && <section className="feed-layout">
          <div className="feed-column">
            <div className="welcome-row"><div><p className="eyebrow">ТВОЁ ПРОСТРАНСТВО</p><h1>Главная</h1></div><span className="date-pill">Четверг, 19 ноября</span></div>
            <section className="stories-panel">
              <div className="section-heading"><h2>Истории</h2><button className="subtle-btn">Смотреть все <span>→</span></button></div>
              <div className="stories">{stories.map((s, i) => <button className="story" key={s.name} onClick={() => s.own && setShowCreate(true)}>
                <div className={`story-ring ${s.own ? 'own' : ''}`}><div className={`avatar ${s.tone || 'own-avatar'}`}>{s.initials}</div></div><span>{s.name}</span>
              </button>)}</div>
            </section>
            <div className="feed-heading"><div><p className="eyebrow">ЧТО НОВОГО</p><h2>Лента</h2></div><button className="filter-btn">Для вас <ChevronDown size={15}/></button></div>
            {posts.map((post, i) => <article className="post-card" key={post.handle}>
              <div className="post-top"><div className={`avatar small ${post.tone}`}>{post.initials}</div><div className="post-author"><strong>{post.name}</strong><span>{post.handle} · {post.time}</span></div><button className="icon-btn more"><MoreHorizontal/></button></div>
              <p className="post-text">{post.text}</p>
              <img className="post-image" src={post.image} alt="Публикация" />
              <div className="post-actions">
                <button className={liked.includes(i) ? 'active-like' : ''} onClick={() => toggle(liked,setLiked,i)}><Heart size={19} fill={liked.includes(i) ? 'currentColor' : 'none'}/><span>{liked.includes(i) ? '2,5 тыс.' : post.likes}</span></button>
                <button><MessageSquare size={19}/><span>{post.comments}</span></button>
                <button><Send size={19}/></button>
                <button className={`save-action ${saved.includes(i) ? 'saved' : ''}`} onClick={() => toggle(saved,setSaved,i)}><Bookmark size={19} fill={saved.includes(i) ? 'currentColor' : 'none'}/></button>
              </div>
            </article>)}
          </div>
          <aside className="right-column">
            <div className="side-card profile-mini"><div className="mini-cover"></div><div className="mini-avatar">Я</div><h3>Твой профиль</h3><p>@your_pulse</p><div className="mini-stats"><span><b>0</b> публикаций</span><span><b>0</b> подписчиков</span></div><button onClick={() => setTab('profile')} className="outline-btn">Открыть профиль</button></div>
            <div className="side-card trends"><div className="section-heading"><h3>Популярное</h3><span className="gold-dot">✦</span></div><div className="trend"><span>#</span><div><b>#путешествия</b><small>12,8 тыс. публикаций</small></div></div><div className="trend"><span>#</span><div><b>#мойдень</b><small>8,2 тыс. публикаций</small></div></div><div className="trend"><span>#</span><div><b>#творчество</b><small>5,6 тыс. публикаций</small></div></div></div>
          </aside>
        </section>}

        {tab === 'chats' && <section className="simple-page"><div className="welcome-row"><div><p className="eyebrow">БУДЬ НА СВЯЗИ</p><h1>Чаты</h1></div><button className="primary-btn"><Plus size={17}/> Новый чат</button></div><div className="search-field"><Search size={18}/><span>Поиск по чатам</span></div><div className="chat-list">{chats.map(c => <div className="chat-row" key={c.name}><div className={`avatar chat-avatar ${c.tone}`}>{c.name[0]}</div><div className="chat-info"><b>{c.name}</b><span>{c.msg}</span></div><div className="chat-meta"><span>{c.time}</span>{c.unread > 0 && <b>{c.unread}</b>}</div></div>)}</div><p className="demo-note">Это демонстрационный интерфейс. Подключение реальных сообщений появится после настройки сервера.</p></section>}

        {tab === 'video' && <section className="simple-page"><div className="welcome-row"><div><p className="eyebrow">СМОТРИ И ДЕЛИСЬ</p><h1>Видео</h1></div><button className="filter-btn">Подписки <ChevronDown size={15}/></button></div><div className="video-grid">{['https://images.unsplash.com/photo-1500534623283-312aade485b7?w=700','https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=700','https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=700','https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700'].map((src,i)=><div className="video-tile" key={src}><img src={src} alt="Видео"/><span className="play"><Play fill="currentColor"/></span><small>@pulse_creator_{i+1}</small></div>)}</div><p className="demo-note">Истории и подарки не смешиваются с видеолентой — они доступны в отдельных разделах.</p></section>}

        {tab === 'profile' && <section className="simple-page profile-page"><div className="profile-cover"><span>ТВОЯ ИСТОРИЯ В PULSE</span></div><div className="profile-head"><div className="profile-avatar">Я</div><div className="profile-details"><h1>Твой профиль</h1><span>@your_pulse</span><p>Добавь немного информации о себе ✨</p></div><button className="outline-btn"><Settings size={16}/> Настроить</button></div><div className="profile-counts"><div><b>0</b><span>Публикаций</span></div><div><b>0</b><span>Подписчики</span></div><div><b>0</b><span>Подписки</span></div></div><div className="empty-state"><div className="empty-icon"><ImagePlus/></div><h3>Здесь появятся твои публикации</h3><p>Делись моментами, фотографиями и мыслями.</p><button className="primary-btn" onClick={() => setShowCreate(true)}><Plus size={17}/> Создать публикацию</button></div></section>}
      </main>

      <nav className="bottom-nav">
        <button className={tab === 'home' ? 'selected' : ''} onClick={() => setTab('home')}><Home/><span>Главная</span></button>
        <button className={tab === 'chats' ? 'selected' : ''} onClick={() => setTab('chats')}><MessageCircle/><span>Чаты</span></button>
        <button className="create-nav" onClick={() => setShowCreate(true)}><span><Plus/></span><small>Создать</small></button>
        <button className={tab === 'video' ? 'selected' : ''} onClick={() => setTab('video')}><Clapperboard/><span>Видео</span></button>
        <button className={tab === 'profile' ? 'selected' : ''} onClick={() => setTab('profile')}><UserRound/><span>Профиль</span></button>
      </nav>

      {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><div className="create-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div><p className="eyebrow">ТВОЙ КОНТЕНТ</p><h2>Создать</h2></div><button className="icon-btn" onClick={() => setShowCreate(false)}><X/></button></div>
        <div className="create-options">
          <button><span className="option-icon purple"><ImagePlus/></span><b>Фото</b><small>Поделись моментом</small></button>
          <button><span className="option-icon pink"><Video/></span><b>Видео</b><small>Создай видеопубликацию</small></button>
          <button><span className="option-icon orange"><Sparkles/></span><b>История</b><small>На 24 часа</small></button>
          <button><span className="option-icon blue"><FileText/></span><b>Текст</b><small>Расскажи, что думаешь</small></button>
          <button><span className="option-icon green"><Users/></span><b>Группа</b><small>Собери своё сообщество</small></button>
          <button><span className="option-icon gold"><Radio/></span><b>Канал</b><small>Публикуй для подписчиков</small></button>
        </div>
      </div></div>}
    </div>
  )
}

export default App
