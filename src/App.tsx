//test
import React, { useState, useMemo } from 'react';
import { Search, Filter, Heart, Star, Play, Users, Trophy, Target } from 'lucide-react';

interface Technique {
  id: number;
  name: string;
  category: string;
  difficulty: number;
  description: string;
  steps: string[];
  tips: string[];
  prerequisites: string[];
}

const techniques: Technique[] = [
  {
    id: 1,
    name: "エビ",
    category: "基本動作",
    difficulty: 1,
    description: "柔術の最も基本的な動作の一つ。エスケープやポジション調整に必須の技術。",
    steps: [
      "仰向けに寝て、膝を胸に引き寄せる",
      "肩を床につけたまま、腰を横に移動させる",
      "足で床を蹴って体を移動させる",
      "反対側も同様に行う"
    ],
    tips: [
      "肩は常に床につけておく",
      "小刻みに素早く動く",
      "相手から遠ざかる方向に移動"
    ],
    prerequisites: []
  },
  {
    id: 2,
    name: "ブリッジ",
    category: "基本動作",
    difficulty: 1,
    description: "腰を持ち上げてスペースを作る基本動作。エスケープの基礎となる。",
    steps: [
      "仰向けに寝て、足を肩幅に開く",
      "手を頭の横に置く",
      "腰を高く持ち上げる",
      "頭頂部で体重を支える"
    ],
    tips: [
      "腰を高く上げる",
      "足の力を使う",
      "首に負担をかけすぎない"
    ],
    prerequisites: []
  },
  {
    id: 3,
    name: "フレーミング",
    category: "基本動作",
    difficulty: 1,
    description: "相手との距離を作るための腕の使い方。ディフェンスの基本。",
    steps: [
      "前腕を相手の体に当てる",
      "肘を90度に曲げる",
      "相手を押し返すように力を加える",
      "両腕でフレームを作る"
    ],
    tips: [
      "前腕全体を使う",
      "肘の角度を保つ",
      "相手の重心を意識"
    ],
    prerequisites: []
  },
  {
    id: 4,
    name: "ベースの取り方",
    category: "基本動作",
    difficulty: 1,
    description: "安定したポジションを保つための基本姿勢。",
    steps: [
      "四つん這いの姿勢を取る",
      "手は肩の真下に置く",
      "膝は腰の真下に置く",
      "背中をまっすぐに保つ"
    ],
    tips: [
      "重心を低く保つ",
      "手足の幅を適切に",
      "相手の動きに合わせて調整"
    ],
    prerequisites: []
  },
  {
    id: 5,
    name: "前転・後転",
    category: "基本動作",
    difficulty: 1,
    description: "柔術の基本的な回転動作。受け身や移動に使用。",
    steps: [
      "しゃがんだ姿勢から始める",
      "手を前について体重を移す",
      "お腹を丸めて回転する",
      "背中で着地して立ち上がる"
    ],
    tips: [
      "お腹を丸める",
      "勢いを利用する",
      "着地は背中全体で"
    ],
    prerequisites: []
  }
  ,
  {
    id: 6,
    name: "ガードポジション",
    category: "基本動作",
    difficulty: 1,
    description: "仰向けの状態から相手をコントロールする基本ポジション。攻撃と守備の両方に使用。",
    steps: [
      "仰向けに寝て、膝を胸に引き寄せる",
      "両足で相手の腰をコントロール",
      "手で相手の袖や襟を掴む",
      "相手との距離を適切に保つ"
    ],
    tips: [
      "足の力で相手をコントロール",
      "手と足の連携を意識",
      "相手の重心を崩す"
    ],
    prerequisites: []
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);

  const categories = ['all', ...Array.from(new Set(techniques.map(t => t.category)))];
  const difficulties = ['all', '1'];

  const filteredTechniques = useMemo(() => {
    return techniques.filter(technique => {
      const matchesSearch = technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          technique.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || technique.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || technique.difficulty.toString() === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty: number) => {
    switch(difficulty) {
      case 1: return 'text-green-400';
      case 2: return 'text-yellow-400';
      default: return 'text-red-400';
    }
  };

  const getDifficultyBg = (difficulty: number) => {
    switch(difficulty) {
      case 1: return 'bg-green-500/20';
      case 2: return 'bg-yellow-500/20';
      default: return 'bg-red-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/30 via-purple-900/30 via-amber-900/30 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-8 bg-gradient-to-r from-white via-blue-300 via-purple-400 via-amber-600 to-gray-800 bg-clip-text text-transparent leading-none">
              BJJ Trip
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl text-white mb-12 max-w-4xl mx-auto font-bold">
              ～０から始める柔術の旅～
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('getting-started-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-700 hover:from-blue-700 hover:via-purple-700 hover:to-amber-800 px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 transform hover:scale-105"
              >
                <Play className="inline-block w-5 h-5 mr-2" />
                今すぐ始める
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Techniques */}
      {/* Getting Started Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 id="getting-started-section" className="text-4xl font-black mb-12 text-center">
          <span className="text-white">
            柔術の始め方
          </span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-blue-500/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-300 text-center">1. 道場を見つける</h3>
            <div className="space-y-4 text-white text-center">
              <p>まずは自宅や職場から通いやすい道場を探しましょう。</p>
              <ul className="space-y-2 text-sm text-gray-200 text-center">
                <li className="text-center">
                  <span className="text-blue-300 mr-2">•</span>
                  体験レッスンがあるか確認
                </li>
                <li className="text-center">
                  <span className="text-blue-300 mr-2">•</span>
                  初心者向けクラスの有無
                </li>
                <li className="text-center">
                  <span className="text-blue-300 mr-2">•</span>
                  通いやすい立地と時間帯
                </li>
                <li className="text-center">
                  <span className="text-blue-300 mr-2">•</span>
                  道場の雰囲気と指導方針
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-purple-500/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-300 text-center">2. 体験レッスンを受ける</h3>
            <div className="space-y-4 text-white text-center">
              <p>いきなり入会せず、まずは体験レッスンで雰囲気を確認。</p>
              <ul className="space-y-2 text-sm text-gray-200 text-center">
                <li className="text-center">
                  <span className="text-purple-300 mr-2">•</span>
                  動きやすい服装で参加
                </li>
                <li className="text-center">
                  <span className="text-purple-300 mr-2">•</span>
                  基本動作から丁寧に指導
                </li>
                <li className="text-center">
                  <span className="text-purple-300 mr-2">•</span>
                  質問しやすい環境か確認
                </li>
                <li className="text-center">
                  <span className="text-purple-300 mr-2">•</span>
                  他の生徒との相性
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-amber-600/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-amber-400 text-center">3. 必要な道具を揃える</h3>
            <div className="space-y-4 text-white text-center">
              <p>最初は最低限の道具から始めて、徐々に揃えていきましょう。</p>
              <ul className="space-y-2 text-sm text-gray-200 text-center">
                <li className="text-center">
                  <span className="text-amber-400 mr-2">•</span>
                  柔術着（道着）
                </li>
                <li className="text-center">
                  <span className="text-amber-400 mr-2">•</span>
                  ラッシュガード（インナー）
                </li>
                <li className="text-center">
                  <span className="text-amber-400 mr-2">•</span>
                  タオルと着替え
                </li>
                <li className="text-center">
                  <span className="text-amber-400 mr-2">•</span>
                  水分補給用のドリンク
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-500/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-200 text-center">4. 継続のコツ</h3>
            <div className="space-y-4 text-white text-center">
              <p>柔術は継続が最も重要。無理せず楽しく続けましょう。</p>
              <ul className="space-y-2 text-sm text-gray-200 text-center">
                <li className="text-center">
                  <span className="text-gray-300 mr-2">•</span>
                  週2-3回のペースから開始
                </li>
                <li className="text-center">
                  <span className="text-gray-300 mr-2">•</span>
                  小さな目標を設定
                </li>
                <li className="text-center">
                  <span className="text-gray-300 mr-2">•</span>
                  仲間との交流を大切に
                </li>
                <li className="text-center">
                  <span className="text-gray-300 mr-2">•</span>
                  上達を焦らず楽しむ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gi Selection Guide */}
      <div className="bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 id="gi-selection-section" className="text-4xl font-black mb-12 text-center">
            <span className="text-white">
              道着の選び方
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-blue-500/30 p-8">
              <h3 className="text-xl font-bold mb-4 text-blue-300 text-center">初心者向け道着</h3>
              <div className="space-y-3 text-white text-sm text-center">
                <p className="font-semibold">価格帯: ¥8,000 - ¥15,000</p>
                <ul className="space-y-2 text-center">
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    軽量で動きやすい
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    洗濯しやすい素材
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    基本的な機能性
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    コストパフォーマンス重視
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-purple-500/30 p-8">
              <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">中級者向け道着</h3>
              <div className="space-y-3 text-white text-sm text-center">
                <p className="font-semibold">価格帯: ¥15,000 - ¥25,000</p>
                <ul className="space-y-2 text-center">
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    耐久性が向上
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    フィット感が良い
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    デザイン性も考慮
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    競技にも対応
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-amber-600/30 p-8">
              <h3 className="text-xl font-bold mb-4 text-amber-400 text-center">上級者向け道着</h3>
              <div className="space-y-3 text-white text-sm text-center">
                <p className="font-semibold">価格帯: ¥25,000+</p>
                <ul className="space-y-2 text-center">
                  <li className="text-center">
                    <span className="text-amber-400 mr-2">•</span>
                    最高品質の素材
                  </li>
                  <li className="text-center">
                    <span className="text-amber-400 mr-2">•</span>
                    プロ仕様の機能性
                  </li>
                  <li className="text-center">
                    <span className="text-amber-400 mr-2">•</span>
                    長期間の使用に耐える
                  </li>
                  <li className="text-center">
                    <span className="text-amber-400 mr-2">•</span>
                    ブランドの信頼性
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-500/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">サイズ選びのポイント</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-300 text-center">上着のサイズ</h4>
                <ul className="space-y-2 text-white text-sm text-center">
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    袖は手首まで届く長さ
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    胴回りに余裕がある
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    肩幅がフィットしている
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    動きを制限しない
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-purple-300 text-center">パンツのサイズ</h4>
                <ul className="space-y-2 text-white text-sm text-center">
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    足首まで届く長さ
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    ウエストが適切にフィット
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    太ももに余裕がある
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    しゃがんでも窮屈でない
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}

      {/* Techniques Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 id="basic-movements-section" className="text-4xl font-black mb-12 text-center">
          <span className="text-white">
            基本動作
          </span>
        </h2>
        
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-500/30 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">基本動作の重要性</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-300 text-center">なぜ基本動作が大切なのか</h4>
                <ul className="space-y-2 text-white text-sm text-center">
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    すべての技術の土台となる
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    怪我の予防につながる
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    体の使い方を覚える
                  </li>
                  <li className="text-center">
                    <span className="text-blue-300 mr-2">•</span>
                    上達のスピードが向上
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-purple-300 text-center">練習のコツ</h4>
                <ul className="space-y-2 text-white text-sm text-center">
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    毎回の練習で基本動作から始める
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    正確性を重視してゆっくり行う
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    鏡で自分の動きをチェック
                  </li>
                  <li className="text-center">
                    <span className="text-purple-300 mr-2">•</span>
                    継続的な反復練習が重要
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTechniques.map((technique) => (
            <div key={technique.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-500/30 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-300 font-semibold">
                    {technique.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyBg(technique.difficulty)} ${getDifficultyColor(technique.difficulty)}`}>
                      レベル {technique.difficulty}
                    </span>
                    <button
                      onClick={() => toggleFavorite(technique.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(technique.id) ? 'fill-red-400 text-red-400' : ''}`} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {technique.name}
                </h3>
                
                <p className="text-gray-200 mb-4 text-sm leading-relaxed">
                  {technique.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">動作手順:</h4>
                    <ul className="text-xs text-gray-200 space-y-1">
                      {technique.steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-300 mr-2">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {technique.tips.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">コツ:</h4>
                      <div className="flex items-center text-xs text-amber-300">
                        <Star className="w-3 h-3 mr-1" />
                        {technique.tips[0]}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTechniques.length === 0 && (
          <div className="text-center py-16">
            <div className="text-white text-lg mb-4">該当する技術が見つかりませんでした</div>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* サイトマップ */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">サイトマップ</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">ホーム</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('getting-started-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">柔術の始め方</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('gi-selection-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">道着の選び方</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('basic-movements-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">基本動作</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }} className="hover:text-white transition-colors duration-200 cursor-pointer">お問い合わせ</a></li>
              </ul>
            </div>
            
            {/* 問い合わせフォーム */}
            <div></div>
            
            {/* サイト情報 */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                BJJ Trip
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                ０から始める柔術の旅。成長の道は、人生を深める旅路へ。
              </p>
              <div className="flex space-x-4 text-gray-300">
                <a href="#" className="hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.23 3.22C17.307 3.481 18.185 4.31 18.185 5.385v9.23c0 1.075-.878 1.904-1.955 2.165C14.926 17.08 12.043 17.5 10 17.5s-4.926-.42-6.23-.72C2.693 16.519 1.815 15.69 1.815 14.615V5.385c0-1.075.878-1.904 1.955-2.165C5.074 2.92 7.957 2.5 10 2.5s4.926.42 6.23.72zM8.5 12.5l4.5-2.5L8.5 7.5v5z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  <span className="sr-only">TikTok</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.012.388a6.5 6.5 0 0 0-2.346 1.267c-.905.745-1.568 1.644-1.943 2.669C.344 5.192.017 6.108.017 7.041v9.933c0 .933.327 1.85.706 2.717.375 1.025 1.038 1.924 1.943 2.669a6.5 6.5 0 0 0 2.346 1.267c.508.184 1.082.306 2.029.34.948.035 1.355.048 4.976.048 3.621 0 4.028-.013 4.976-.048.947-.034 1.521-.156 2.029-.34a6.5 6.5 0 0 0 2.346-1.267 6.5 6.5 0 0 0 1.943-2.669c.379-.867.706-1.784.706-2.717V7.041c0-.933-.327-1.85-.706-2.717a6.5 6.5 0 0 0-1.943-2.669A6.5 6.5 0 0 0 19.988.388C19.48.204 18.906.082 17.959.048 17.011.013 16.604 0 12.983 0h.034zm1.265 1.4c.834.013 1.326.048 2.113.333.787.285 1.477.686 2.060 1.13.583.445 1.061.895 1.465 1.465.404.57.845 1.273 1.13 2.060.285.787.32 1.279.333 2.113.013.834.013 1.326.013 4.637 0 3.311 0 3.803-.013 4.637-.013.834-.048 1.326-.333 2.113-.285.787-.726 1.49-1.13 2.060-.404.57-.882 1.02-1.465 1.465-.583.445-1.273.845-2.060 1.13-.787.285-1.279.32-2.113.333-.834.013-1.326.013-4.637.013-3.311 0-3.803 0-4.637-.013-.834-.013-1.326-.048-2.113-.333-.787-.285-1.49-.685-2.060-1.13a3.9 3.9 0 0 1-1.465-1.465c-.445-.57-.845-1.273-1.13-2.060-.285-.787-.32-1.279-.333-2.113-.013-.834-.013-1.326-.013-4.637 0-3.311 0-3.803.013-4.637.013-.834.048-1.326.333-2.113.285-.787.685-1.49 1.13-2.060.445-.57.895-1.061 1.465-1.465.57-.404 1.273-.845 2.060-1.13.787-.285 1.279-.32 2.113-.333.834-.013 1.326-.013 4.637-.013z"/>
                    <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* コピーライト */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                トップへ戻る
              </button>
              <div className="text-center text-sm text-gray-500">
                <span className="text-gray-400">© BJJ Trip 2025</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-600 p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">お問い合わせ</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  お名前
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  placeholder="お名前を入力してください"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  placeholder="メールアドレスを入力してください"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  メッセージ
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-white resize-none"
                  placeholder="メッセージを入力してください"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold text-white transition-colors duration-200"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors duration-200"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
