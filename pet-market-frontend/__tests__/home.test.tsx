import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock('next/image', () => (props) => {
  const { fill, ...rest } = props;
  return <img {...rest} />;
});

jest.mock('@/context/category/category-context', () => ({
  useCategory: () => ({
    onGetSystemCategories: jest
      .fn()
      .mockResolvedValue({ data: [], error: null }),
  }),
}));
jest.mock('@/api/public/public-api', () => ({
  getStats: jest.fn().mockResolvedValue({}),
}));

describe('Home page', () => {
  it('отрисовывает главное изображение с alt="auth-cat"', async () => {
    render(<Home />);
    const mainImage = await waitFor(() => screen.getByAltText('auth-cat'));
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', '/home.jpg');
  });

  it('отрисовывает раздел "Статистика маркетплейса"', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/Статистика маркетплейса/i)).toBeInTheDocument();
      expect(screen.getByText(/Количество пользователей/i)).toBeInTheDocument();
      expect(screen.getByText(/Количество питомцев/i)).toBeInTheDocument();
      expect(screen.getByText(/Количество питомников/i)).toBeInTheDocument();
    });
  });

  it('отрисовывает раздел "Топ категории"', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/Топ категории/i)).toBeInTheDocument();
      expect(screen.getByText(/Все/i)).toBeInTheDocument();
    });
  });
});

