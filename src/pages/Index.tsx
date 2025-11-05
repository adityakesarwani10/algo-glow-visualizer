import { AlgorithmVisualizer } from '@/components/AlgorithmVisualizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AlgorithmVisualizer />
      
      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with ❤️ by{' '}
            <span className="text-primary font-semibold">Aditya Kesarwani</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
